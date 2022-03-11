---
layout: post
title: Deploy WordPress on KataCoda Kubernetes
description: A quick guide to deploy WordPress on Kubernetes within the KataCoda platform.
comments: true
tags: DevOps Learning, Kubernetes
---

A step by step guide to deploying WordPress on Kubernetes provided by the KataCoda website.
Please note that this shouldn't be used for a production deployment and should only be used for learning and/or practice.

### Create a Secret for the MySQL Password

The first step is to create a secret that can be used to store the MySQL database password. Later in the deployment this will be used in creating the MySQL database pod and then used by the WordPress pod to connect to the database.

First base64 encode the password.

```bash
echo 'my-password' | base64
```

Copy the output and place it in the secrets.yaml file.

```yaml
apiVersion: v1
data:
  password: bXktcGFzc3dvcmQK
kind: Secret
metadata:
  name: mysql-pass
  namespace: default
type: Opaque
```

Once the file is created, apply it to create the secret.

```bash
kubectl apply -f secrets.yaml
```

### Create a Storage Class

Both MySQL and WordPress need a persistent data store in order to preserve data through restarts, rescheduling or any other Pod disruptions.

Create the following storageclass.yaml on the server.

`storageclass.yaml`

```yaml
kind: StorageClass
apiVersion: storage.k8s.io/v1
metadata:
  name: manual
provisioner: kubernetes.io/no-provisioner
volumeBindingMode: WaitForFirstConsumer
```

Next apply it to create the StorageClass.

```bash
kubectl apply -f storageclass.yaml
```

### Create Persistent Volumes

In this step some two PersistentVolume(s) are created. One for each of MySQL and WordPress.

`mysql-persistentvolume.yaml`

```yaml
apiVersion: v1
kind: PersistentVolume
metadata:
  name: mysql-pv-claim
spec:
  storageClassName: manual
  capacity:
    storage: 20Gi
  accessModes:
  - ReadWriteOnce
  hostPath:
    type: ""
    path: /wordpress/mysql
```

```bash
kubectl apply -f worpdress-persistentvolume.yaml
```

`wordpress-persistentvolume.yaml`

```yaml
apiVersion: v1
kind: PersistentVolume
metadata:
  name: wp-pv-claim
spec:
  storageClassName: manual
  capacity:
    storage: 20Gi
  accessModes:
  - ReadWriteOnce
  hostPath:
    path: /wordpress/wordpress
```

```bash
kubectl apply -f worpdress-persistentvolume.yaml
```

### Deploy MySQL

Now it's time to deploy the MySQL Pod.

First create a PersistentVolumeClaim, which is a request to use the storage created in the following step. Hopefully, the persistent volume is feeling generous and let's us use it.

`mysql-pvc.yaml`

```yaml
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: mysql-pv-claim
  labels:
    app: wordpress
spec:
  accessModes:
    - ReadWriteOnce
  resources:
    requests:
      storage: 20Gi
  storageClassName: manual
```

```bash
kubectl apply -f mysql-pvc.yaml
```

On to the Pod, for this step deploy MySQL. In this case using a deployment, however, it's only going to have a replicaset with one Pod. So it's not very good for High Availability (HA) or production use. Just for learning/practice purposes.

`mysql-deployment.yaml`


```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: wordpress-mysql
  labels:
    app: wordpress
spec:
  selector:
    matchLabels:
      app: wordpress
      tier: mysql
  strategy:
    type: RollingUpdate
  template:
    metadata:
      labels:
        app: wordpress
        tier: mysql
    spec:
      containers:
      - image: mysql:5.6
        name: mysql
        env:
        - name: MYSQL_DATABASE
          value: wordpress
        - name: MYSQL_ROOT_PASSWORD
          valueFrom:
            secretKeyRef:
              name: mysql-pass
              key: password
        ports:
        - containerPort: 3306
          name: mysql
        volumeMounts:
        - name: mysql-persistent-storage
          mountPath: /var/lib/mysql
      volumes:
      - name: mysql-persistent-storage
        persistentVolumeClaim:
          claimName: mysql-pv-claim
```

Create the deployment which in turn should create the Pod, it may take a few minutes to pull down the image and get things running, so be patient.

```bash
kubectl apply -f mysql-deployment.yaml
```

We have MySQL running in a Pod at this point! However, it's not possible to reach it. In order to access it a service needs to be created. This will expose MySQL port 3306 to the local Kubernetes cluster.

`mysql-service.yaml`

```yaml
apiVersion: v1
kind: Service
metadata:
  name: wordpress-mysql
  labels:
    app: wordpress
spec:
  ports:
    - port: 3306
  selector:
    app: wordpress
    tier: mysql
  clusterIP: None
```

```bash
kubectl apply -f mysql-service.yaml
```

### Deploy WordPress

Almost there now! Just have to deploy WordPress.

The first step is to create a persistent volume claim so WordPress has some where to keep its files.

`wordpress-pvc.yaml`

```yaml
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: wp-pv-claim
  labels:
    app: wordpress
spec:
  accessModes:
    - ReadWriteOnce
  resources:
    requests:
      storage: 20Gi
  storageClassName: manual
```

```bash
kubectl apply -f wordpress-pvc.yaml
```

Next create the WordPress deployment that will create a replicaset and one Pod (again, this is only for learning/practice purposes).

`wordpress-deployment.yaml`

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: wordpress
  labels:
    app: wordpress
spec:
  selector:
    matchLabels:
      app: wordpress
      tier: frontend
  strategy:
    type: RollingUpdate
  template:
    metadata:
      labels:
        app: wordpress
        tier: frontend
    spec:
      containers:
      - image: wordpress:latest
        name: wordpress
        env:
        - name: WORDPRESS_DB_HOST
          value: wordpress-mysql
        - name: WORDPRESS_DB_USER
          value: root
        - name: WORDPRESS_DB_NAME
          value: wordpress
        - name: WORDPRESS_DB_PASSWORD
          valueFrom:
            secretKeyRef:
              name: mysql-pass
              key: password
        ports:
        - containerPort: 80
          name: wordpress
        volumeMounts:
        - name: wordpress-persistent-storage
          mountPath: /var/www/html
      volumes:
      - name: wordpress-persistent-storage
        persistentVolumeClaim:
          claimName: wp-pv-claim
```

Apply the deployment yaml to create the Pod.


```bash
kubectl apply -f wordpress-deployment.yaml
```

Finally! Create a service to expose WordPress to an external loadbalancer so it's possible to access from a remote browser.

`wordpress-service.yaml`

```yaml
apiVersion: v1
kind: Service
metadata:
  name: wordpress
  labels:
    app: wordpress
spec:
  ports:
    - port: 80
      nodePort: 30080
  selector:
    app: wordpress
    tier: frontend
  type: NodePort
```

```bash
kubectl apply -f wordpress-service.yaml
```

