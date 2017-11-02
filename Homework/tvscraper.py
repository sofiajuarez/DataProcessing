#!/usr/bin/env python
# Name: SOFIA JUAREZ RODRIGUEZ
# Student number: 10689184
'''
This script scrapes IMDB and outputs a CSV file with highest rated tv series.
'''
import csv
import requests 

from pattern import web
from pattern.web import URL, DOM, plaintext


TARGET_URL = "http://www.imdb.com/search/title?num_votes=5000,&sort=user_rating,desc&start=1&title_type=tv_series"
BACKUP_HTML = 'tvseries.html'
OUTPUT_CSV = 'tvseries.csv'
    
''' Extract a list of highest rated TV series from DOM (of IMDB page).

    Each TV series entry should contain the following fields:
    - TV Title
    - Rating
    - Genres (comma separated if more than one)
    - Actors/actresses (comma separated if more than one)
    - Runtime (only a number!)'''
	
# Specify website used	
url = URL(TARGET_URL)

# Download the DOM of the website
dom = DOM(url.download(cached=True))

def extract_tvseries(dom):
	
	# Declare list 
	series=[]
	
	for e in dom.by_tag('lister-item-header')[:100]:
		
		# Search title in DOM, accept all utf characters
		title = e.by_tag('a')[0].content.encode("utf-8")
		
		# Search rating
		rating = e.by_tag('ratings-bar')[0].content.encode("utf-8")
		
		# Search genres and join them
		genres = e.by_tag('genre')[0].by_tag('a').encode("utf-8")
		genres = " / ".join([g.content for g in genres])
		
		# Search runtime 
		runtime = e.by_tag('runtime')[0].content.encode("utf-8")
		
		# Add only numbers of the runtime to the list
		for number in runtime:
			if number.isdigit():
				runtime = " ".join([r.content for r in runtime])
		
		# Append all data to the list
		series.append([title, rating, genres, runtime])
		
	
	# Return list
	return series 
	



def save_csv(f, tvseries):

	'''Output a CSV file containing highest rated TV-series.'''
	
	# Use csv library to write (and not to read)
	writer = csv.writer(f)
	writer.writerow(['title', 'rating', 'genre', 'actors', 'runtime'])
	
	# Write list into csv file row by row
	for row in range(len(tvseries)):
		writer.writerow(tvseries(row))


if __name__ == '__main__':
   # Download the HTML file
    url = URL(TARGET_URL)
    html = url.download()

    # Save a copy to disk in the current directory, this serves as an backup
    # of the original HTML, will be used in grading.
    with open(BACKUP_HTML, 'wb') as f:
        f.write(html)

    # Parse the HTML file into a DOM representation
    dom = DOM(html)

    # Extract the tv series (using the function you implemented)
    tvseries = extract_tvseries(dom)

    # Write the CSV file to disk (including a header)
    with open(OUTPUT_CSV, 'wb') as output_file:
        save_csv(output_file, tvseries) 
