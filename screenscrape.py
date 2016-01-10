from googlesearch import GoogleSearch as gs

"""
Returns number of hits from google.
"""


def return_results(query):
    return gs(query).count()
