# Sofia Juarez Rodriguez
# 10689184
# Homework 3 dataprocessing

import csv
import json

# Define in- and output files
infile = input("Origin file (between quotation marks):")
outfile = input("Exit file (between quotation marks):")

def fromcsvtojson(infile, outfile):
	
	#Opens and reads input file and writes data in output file
	csvfile = open(infile, 'r')
	jsonfile = open(outfile, 'w')
	
	#Define json fields
	fieldnames = ("location","2006","2007","2008","2009","2010","2011","2012","2013","2014","2015","2016")
	reader = csv.DictReader(csvfile, fieldnames)
	
	#Write for every csv row an array in the output json file
	jsonfile.write("[")
	for row in reader:
		json.dump(row, jsonfile)
		jsonfile.write(', \n')
	jsonfile.write("]")

#Execute function		
fromcsvtojson(infile, outfile)