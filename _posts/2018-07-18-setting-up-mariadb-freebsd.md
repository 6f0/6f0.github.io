Setting up MariaDB on FreeBSD
-----------------------------

This will briefly cover building from source and some notes for some 
silly mistakes that I made and how to "fix" them or at least get things 
working. Let's get started.

### Make sure everything is up to date

Before starting anything else make sure that all ports are there and 
up to date.

```bash
# portsnap fetch update &&  portupgrade -a
```

**Note:** If this is new install you might need to extract first,
`portsnap extract`.

### Building

First make sure that you don't have MySQL or another version of MariaDB 
installed. If you do, you'll want to remove them first.

Getting down to business,

```bash
# cd /usr/ports/databases/mariadb103-server
# make install clean
```

### Setting up

Now that everything is built, we'll enable it in `rc.conf`

```bash
echo 'mysql_enable="YES"' >> /etc/rc.conf
```

Next you'll want to grab a config file that fits your needs from 
`/usr/local/share/mysql/my-(huge,innodb-heavy,large,medium,small).cnf` 
and copy it to `/usr/local/etc/my.cnf`. Finally make any modifications you 
wish to the file.

**Note:** if you missed this step and tried starting the server first you've 
probably noticed that it had an error didn't start and won't start now. In 
order to remedy this I moved into this `/var/db/mysql` directory deleted 
everything and then copied the `my.cnf` file modified it and then tried 
starting the server again everything started up fine.

This is what I found in my error log when I tried starting without a config 
file:

```bash
2018-07-19  2:23:29 34424840192 [ERROR] InnoDB: Cannot start InnoDB. The tail of the system tablespace is missing. Have you edited innodb_data_file_path in my.cnf in an inappropriate way, removing data files from there? You can set innodb_force_recovery=1 in my.cnf to force a startup if you are trying to recover a badly corrupt database.
2018-07-19  2:23:29 34424840192 [ERROR] InnoDB: Plugin initialization aborted with error Generic error
2018-07-19  2:23:30 34424840192 [Note] InnoDB: Starting shutdown...
2018-07-19  2:23:30 34424840192 [ERROR] Plugin 'InnoDB' init function returned error.
2018-07-19  2:23:30 34424840192 [ERROR] Plugin 'InnoDB' registration as a STORAGE ENGINE failed.
2018-07-19  2:23:30 34424840192 [Note] Plugin 'FEEDBACK' is disabled.
2018-07-19  2:23:30 34424840192 [ERROR] Could not open mysql.plugin table. Some plugins may be not loaded
2018-07-19  2:23:30 34424840192 [ERROR] Unknown/unsupported storage engine: InnoDB
2018-07-19  2:23:30 34424840192 [ERROR] Aborting
```

### Starting

```bash
# service mysql-server start
```

You should see output similar to this on the first start:

```bash
Installing MariaDB/MySQL system tables in '/var/db/mysql' ...
2018-07-19  2:41:41 34424840192 [Warning] 'THREAD_CONCURRENCY' is deprecated and will be removed in a future release.
2018-07-19  2:41:41 34929512448 [Warning] Failed to load slave replication state from table mysql.gtid_slave_pos: 1146: Table 'mysql.gtid_slave_pos' doesn't exist
OK

To start mysqld at boot time you have to copy
support-files/mysql.server to the right place for your system

PLEASE REMEMBER TO SET A PASSWORD FOR THE MariaDB root USER !
To do so, start the server, then issue the following commands:

'/usr/local/bin/mysqladmin' -u root password 'new-password'
'/usr/local/bin/mysqladmin' -u root -h example password 'new-password'

Alternatively you can run:
'/usr/local/bin/mysql_secure_installation'

which will also give you the option of removing the test
databases and anonymous user created by default.  This is
strongly recommended for production servers.

See the MariaDB Knowledgebase at http://mariadb.com/kb or the
MySQL manual for more instructions.

You can start the MariaDB daemon with:
cd '/usr/local' ; /usr/local/bin/mysqld_safe --datadir='/var/db/mysql'

You can test the MariaDB daemon with mysql-test-run.pl
cd '/usr/local/mysql-test' ; perl mysql-test-run.pl

Please report any problems at http://mariadb.org/jira

The latest information about MariaDB is available at http://mariadb.org/.
You can find additional information about the MySQL part at:
http://dev.mysql.com
Consider joining MariaDB's strong and vibrant community:
https://mariadb.org/get-involved/

Starting mysql.
```

You can check the status:

```bash
# service mysql-server status
```

### Securing the install

On the first start it will advise you to use `mysqladmin` to set a root 
password. However, I prefer to run `mysql_secure_installation` it will 
let you set a root password and also clean up a few other things in the 
mean time.

That should be it, if I missed anything or if you would like some help 
setting this up on your server feel free to drop me a line.