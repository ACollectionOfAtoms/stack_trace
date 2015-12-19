import requests
from BeautifulSoup import BeautifulSoup
import sys

def returnResults(query):
    r = requests.get('http://www.google.com/search',
                     params={'q':'"' + query + '"',
                             "tbs":"li:1"}
                    )
    soup = BeautifulSoup(r.text)
    result = soup.find('div',{'id':'resultStats'}).text
    result = result.split()
    print result[1]
    sys.stdout.flush()

def main():
    query = str(sys.argv[1])
    returnResults(query)
main()
