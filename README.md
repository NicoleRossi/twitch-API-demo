# twitch-API-demo
Playing with the Twitch Developer API

# How To Use
Click inside the "Search query.." text input and enter a search term; then click the "Search" button.  Clicking a stream will redirect to a new window/tab showing a blob of JSON associated with the clicked stream.  Clicking the next or previous button will go forward or backwards, respectively.  The next/previous buttons hide themselves if they cannot be used (e.g. if you're viewing the first page of search results, the previous button will not show).

# Decision Making
I've noticed that requesting 5 (for example) streams at a time does not alway yield exactly 5 streams returned, even when 'total results' is greater than 5.  I assume this is because a stream suddenly became unavailable.  

In a more perfect implementation, I'd like to request 10 streams and save any overage for later.  Also, I'd like to always show fresh data, removing any unaccesible streams.  However, comparing saved data against freshly requested data would increase the number of server requests.  Also, removing stale data would play havoc with the page numbering system (and worse, the offset parameter of the API request for streams):  for example, suppose an entire prior page of streams must be removed due to stale data, would the offset parameter of the streams API request also decrease or would the front end now be out of sync with the server with no way to recover?  

Another alternative would be to keep making server requests for the missing streams.  For example, if 3 are returned and the total search hits is 100, then make a second request for 2 more streams, and keep making requests until 5 total streams are retrieved.  But again, this raises the issue of fresh data again: what happens if stream #1 becomes unavailable while the app is trying to obtain streams #4 and #5--potentially an infinite loop!  Technically, I could set a maximum on the number of API calls, but that would require extra implementation time and complexity while still not guaranteeing enough streams to display if the total of “available” streams is large enough and enough streams become unavailable at the last minute (though it does reduce the chance of this happening greatly!). 

As a result, I decided to keep it simple and always request 5 streams, displaying whatever was sent, even if it was less than 5.
