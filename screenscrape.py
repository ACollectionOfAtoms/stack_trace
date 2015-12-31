import requests
from BeautifulSoup import BeautifulSoup

"""
Returns number of hits from google.
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
