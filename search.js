const userBangs = require('./user.json');

export default (req, res) => {
  if (req.method === 'GET') {
    const query = req.query.q;
    const bangMatch = query.match(/^([Vv][0-9A-z]+)\b|\b([Vv][0-9A-z]+)$/g);
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
        res.redirect(`https://duckduckgo.com/?q=!${bang}%20${encodeURIComponent(mainQuery)}`);
      }
    } else {
      res.redirect(`https://duckduckgo.com/?q=!g%20${encodeURIComponent(mainQuery)}`);
    }
  } else {
    res.status(405).send({ error: 'Only GET requests are allowed' });
  }
};
