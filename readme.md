### Some important links

https://certbot.eff.org/instructions?ws=other&os=ubuntubionic&tab=standard
https://pm2.keymetrics.io/docs/usage/startup/

### Run native with dev backend

- run `pnpm start` to wake up the back and front end;
- run `ngrok http --domain=fleet-hamster-positive.ngrok-free.app 80` in the terminal to open the ngrok tunnel. `Do not forget to close it at the end.`
- connect the device by USB in debug mode.
- run `pnpm start:native` and make sure the native app was successfully installed.
