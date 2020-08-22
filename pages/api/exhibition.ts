// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default (req, res) => {
  console.log('request obj: ', req.query)
  res.statusCode = 200
  res.json({ exhibition: {
    artists: [
      'Helen Frankenthaler',
      'John Cage',
      'Merce Cunningham',
      "Georgia O'keefe"
    ]
  } })
}
