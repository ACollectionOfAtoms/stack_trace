import requests
import BeautifulSoup

def returnResults(query):
    r = requests.get('http://www.google.com/search',
                     params={'q':'"' + query + '"',
                             "tbs":"li:1"}
                    )
    soup = BeautifulSoup(r.text)
    return soup.find('div',{'id':'resultStats'}).text
