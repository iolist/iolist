# ioList
The app for saving your todo and other notes

## Config

Server config located in `.env`

## Before start

Migration:
```node_modules/.bin/sequelize db:migrate```

Seeds:
```node_modules/.bin/sequelize db:seed:all```

## How to revert DB changes

```node_modules/.bin/sequelize db:migrate:undo:all```

## How to start:

- dev:
`npm run dev`
- prod
`npm start`

