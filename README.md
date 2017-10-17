# twitch-API-demo
Playing with the Twitch Developer API

# Future Improvements
I've noticed that requesting 5 (for example) streams at a time does not alway yield exactly 5 streams returned, even when 'total results' is greater than 5.  I assume this is because a stream suddenly became unavailable.  

In a more perfect implementation, I'd like to request 10 streams and save any overage for later.  Also, I'd like to always show fresh data, removing any unaccesible streams.  However, comparing saved data against freshly requested data would increase the number of server requests.  Also, removing stale data would play havoc with the page numbering system (and worse, the offset parameter of request for streams):  for example, suppose an entire prior page of streams must be removed due to stale data, would the offset parameter of the streams request also decrease and would the front end now be out of sync with the server?  

Another alternative would be to keep making server requests for the missing streams.  For example, if 3 are returned and the total search hits is 100, then make a second request for 2 more streams, and keep making requests until 5 total streams are retrieved.  But this raises the issue of fresh data again: what happens if stream #1 becomes unavailable while the app is trying to obtain streams #4 and #5--potentially an infinite loop!

As a result, I decided to keep it simple and always request 5 streams, displaying whatever was sent, even if it was less than 5.
