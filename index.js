const express = require('express');
const app = express();
const userBangs = require('./user.json');

app.get('/', (req, res) => {
  const query = req.query.q;
  const bangMatch = query.match(/\b(v[0-9A-z]{1,4})\b/g);
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
      const redirectUrl = bangMatch.u.replace('{{{s}}}', mainQuery);
      res.redirect(redirectUrl);
    } else {
      res.redirect(`https://duckduckgo.com/?q=!${bang}%20${encodeURIComponent(mainQuery)}`);
    }
  } else {
    res.redirect(`https://kagi.com/search?q=${encodeURIComponent(mainQuery)}`);
  }
});

app.listen(3000, () => console.log('Server is running'));
