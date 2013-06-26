import requests, systemSort
from sys import argv
name = argv[1]
option = argv[2]

ip, port = systemSort.getAddr(name)
#argv[1] is the first arg 
if option == "system":
	s = requests.get("http://{}:{}/ui/services/locations".format(ip, port), auth=("user", "video123"))

	for system in s.json():
		print "<div id='system'>"
		print system['properties']['name']
		print "</div>"

elif option == "collab":
	c = requests.get("http://{}:{}/ui/services/resources".format(ip, port), auth=("user", "video123"))
	#con = requests.get("http://{}:{}/ui/services/connections".format(ip, port), auth=("user", "video123"))

	#names = []
	#for item in con.json():
	#	if item['action'] =='connected':
	#		names.append(item['name'])
	counter = 1
	for system in c.json():
		print "<div id='collab{0}' class=collab >".format(counter)
		print system['properties']['name'] + ":", system['properties']['type']
		#print "<div id=c{} class=panel>".format(counter)
		#for name in names:
		#	print "<div id=system>"
		#	print name
		#	print "</div>"
		#print "</div>"
		print "</div>"
		counter +=1
	
