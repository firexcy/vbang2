const express = require('express');
const app = express();
const userBangs = require('./user.json');

app.use(express.static('.'));

app.get('/search', (req, res) => {
  if (req.method === 'GET') {
    const query = req.query.q;
    let bangMatch = query.match(/^([Vv][0-9A-z]+)\b|\b([Vv][0-9A-z]+)$/g);
    let bang, mainQuery;

    if (bangMatch && bangMatch.length >= 1) {
      bang = bangMatch[0].substring(1);
      mainQuery = query.replace(bangMatch[0], '').trim();
    } else {
      bang = null;
      mainQuery = query;
    }

    if (bang) {
      const bangMatch = userBangs.find(entry => entry.t === bang);
      if (bangMatch) {
        const redirectUrl = bangMatch.u.replace('{{{s}}}', encodeURIComponent(mainQuery));
        res.redirect(redirectUrl);
      } else {
        res.redirect(`https://kagi.com/search?q=!${bang}%20${encodeURIComponent(mainQuery)}`);
      }
    } else {
      res.redirect(`https://kagi.com/search?q=${encodeURIComponent(mainQuery)}`);
    }
  } else {
    res.status(405).send({ error: 'Only GET requests are allowed' });
  }
});

app.listen(3000, () => {
  console.log(`Server listening on port 3000`)
});