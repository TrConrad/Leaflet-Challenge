# Leaflet-Challenge

This challenge was an exercise in utilizing GeoJSON, Leaflet and Javascript to create an interactive map that tracked Earthquake activities. The data was first pulled from a URL using the D3 JavaScript library, then converted into both objects and arrays using GeoJSON. Leaflet was then employed to create a map of each earthquake list in the dataset, which was a list of every earthquake recorded over the previous week. This map was used to display the locations of each earthquake, using circleMarkers.  The size of each circleMarker was determine  by the magnitude of the earthquake, and the color by the respective depth. Leaflet was also utilized to program in a legend, which displays the range of kilometers each marker color covers, in order of smallest to greatest. The CSS file was updated to reflect this change, so that the legend would be easier to read, and also reflect the correct color for each entry. Frm there, a popup was bound to each marker, and listed the respective depth, location - in terms of longitude and latitude, and the magitude of each earthquake. As no map center was given for this assignment, it was set as the variable equivalent of the first earthequake in the dataset. 


Works Cited:

While websites such as Bing Ai and Slack Overflow were referenced for researching functions and formatting as needed, no code was directly copied.
