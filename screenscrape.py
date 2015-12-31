import requests
from BeautifulSoup import BeautifulSoup
import sys

"""
Returns number of hits from google page. Use as
----
python screenscrape.py <query>
----
"""


def return_results(query):
    r = requests.get('http://www.google.com/search',
                     params={'q': '"' + query + '"',
                             "tbs": "li:1"}
                    )
    soup = BeautifulSoup(r.text)
    result = soup.find('div', {'id': 'resultStats'}).text
    result = result.split()
    return result[1]

#     sys.stdout.flush()
#
#
# def main():
#     query = str(sys.argv[1])
#     return_results(query)
# main()
