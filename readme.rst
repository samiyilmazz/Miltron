Thats an MVC PHP (Codeigniter) project for rocket control interface. Coded for Miltron challange.

-Models: Not used.

-Views: Seperated to more little pieces
-includes/head -includes/scripts (Main page mostly works on this. I used javascript to render main page for more dynamic design like; Flames under rocket which is launched. And also API's are in here).
-Controllers: Socket is here. Takes port number as parameter.

Note: 
-To avoid not working services i used Jquery with interval, so even if there is no response, it will send request again and again. 
-To avoid services which is resposing wrong data is cleaned up in rockets.js and returned "invalid data".
-To avoid infinity loop in sending request, added blockUI and inform user about last request is not successfull and try again message instead of sending request again.
