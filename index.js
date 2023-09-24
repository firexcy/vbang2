const express = require('express');
const app = express();
const userBangs = require('./user.json');

app.get('/', (req, res) => {
  const query = req.query.q;
  const bangMatch = query.match(/([!！][0-9A-z]+)/g);
  let bang, mainQuery;

  if (bangMatch && bangMatch.length >= 1) {
    bang = bangMatch[0].substring(1);
    mainQuery = query.replace(bangMatch[0], '').trim();
  } else {
    bang = null;
    mainQuery = query;
  }

  if (bang) {
    const bangEntry = userBangs.find(entry => entry.t === bang);
    if (bangEntry) {
      const redirectUrl = bangEntry.u.replace('{{{s}}}', mainQuery);
      res.redirect(redirectUrl);
    } else {
      res.redirect(`https://duckduckgo.com/?q=${query}`);
    }
  } else {
    res.redirect(`https://duckduckgo.com/?q=!g%20${query}`);
  }
});

app.listen(3000, () => console.log('Server is running'));
