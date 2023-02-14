
## Project: 
Clog - A basic blogging system specific for coding  
This repo is the express backend for blog system for project 4

## Description:
Clog is built on the MERN stack.  
  

Front End - git repo : github.com/nathanielzacharias/blog-react-project4  
Front End - live site : https://tiny-torte-523892.netlify.app/  
  
  
Back End - git repo : https://github.com/nathanielzacharias/blog-express-project4  
Back End - deployment : on AWS EC2  

Clog has 2 Models: articles & users (articles has full CRUD)

## New techs I learnt completely on my own:
Rich Text Editor - react-quill - https://blog.logrocket.com/build-a-wysiwyg-text-editor-using-quill/  
  
HTML Parser - html-react-parser - https://github.com/remarkablemark/html-react-parser  
  
HighlightJS - syntax highlighter for HTML - https://github.com/highlightjs/highlight.js/  

## Other techs used in Clog:
react-bootstrap  
MUI  
JWT

## Deployment to AWS EC2
- Under Security, Inbound traffic, set Custom TCP port 8443.    
- On the instance (SSH term), run: sudo iptables -t nat -A PREROUTING -p tcp --dport 443 -j REDIRECT --to-ports 8443   
- Start process using: pm2 start server.js  
- Check: pm2 logs  
- Monitor: pm2 monitor server  
- Certbot for SSL/TLS: sudo certbot certonly --manual  
- Store ACME challenge file within this directory /static/.well-known/acme-challenge/filename-as-outputted-by-certbot  
- (More detailed instructions for certbot and files: https://flaviocopes.com/express-letsencrypt-ssl/)  
- Create group, allow root access to read .pem cert files to node:  
// Create group with root and nodeuser as members  
$ sudo addgroup nodecert  
$ sudo adduser nodeuser nodecert //replace nodeuser with ubuntu or output of whoami  
$ sudo adduser root nodecert  
  
// Make the relevant letsencrypt folders owned by said group.  
$ sudo chgrp -R nodecert /etc/letsencrypt/live  
$ sudo chgrp -R nodecert /etc/letsencrypt/archive  
  
// Allow group to open relevant folders  
$ sudo chmod -R 750 /etc/letsencrypt/live  
$ sudo chmod -R 750 /etc/letsencrypt/archive  
  
Then sudo reboot, after a few minutes will be rebooted.  
 