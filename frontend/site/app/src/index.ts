import express from 'express'
import next    from 'next'

const bootstrap = async () => {
  const app = next({
    dev: process.env.NODE_ENV !== 'production',
    dir: __dirname,
  })

  const handle = app.getRequestHandler()

  await app.prepare()

  const server = express()

  server.get('*', (req, res) => handle(req, res))

  server.listen(process.env.PORT || 3000)
}

bootstrap()
