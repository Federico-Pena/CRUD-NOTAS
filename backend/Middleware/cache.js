export const setCache = function (req, res, next) {
  const period = 0
  if (req.method === 'GET') {
    res.set('Cache-control', `public, max-age=${period}`)
    res.set('Cache-control', 'no-store')
  } else {
    res.set('Cache-control', 'no-store')
  }
  next()
}
