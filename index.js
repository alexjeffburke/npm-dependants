const fetch = require('node-fetch')
const cheerio = require('cheerio')

module.exports = async name => {
  let offset = 0

  const next = async () => {
    const url = `https://npmjs.com/browse/depended/${name}?offset=${offset}`
    const res = await fetch(url)
    const html = await res.text()
    const $ = cheerio.load(html)
    const dependants = []
    $('a[href^="/package/"]').each((_, el) => {
      const dependant = $(el)
        .attr('href')
        .slice('/package/'.length)
      if (dependant !== name) dependants.push(dependant)
    })
    offset += 36
    return dependants
  }

  const results = []
  while (true) {
    const found = await next()
    if (found.length === 0) break
    results.push(...found)
  }

  return {
    [Symbol.iterator] () {
      return {
        next: () => {
          if (results.length > 0) {
            return { value: results.shift(), done: false }
          } else {
            return { value: null, done: true }
          }
        }
      }
    }
  }
}
