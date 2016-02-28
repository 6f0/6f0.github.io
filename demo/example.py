import requests
from bs4 import BeautifulSoup

# make the page request
r = requests.get("http://localhost:8888/demo/table-data.html")

# make sure the result is good
if r.status_code == 200 and r.headers['Content-type'] == "text/html":

    # let's get the html
    html = r.content

    # create some beautiful soup
    soup = BeautifulSoup(html, "lxml")

    # grab all the table rows
    table_rows = soup.findAll("tr")

    # loop through them and grab the first and last names
    for row in table_rows:
        # get all columns from the row
        row_data = row.findAll("td")
        # get just the text from the first and last name columns
        first_name = row_data[1].text
        last_name = row_data[2].text
        print "Hello, %s %s!"%( first_name, last_name)
else:
    print "something went wrong"