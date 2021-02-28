const express = require('express');
const app = express();
const axios = require('axios');

const data = {};
data.manufacturers = {};
data.items = {};
const dataUpdated = {};
let lastUpdate = '';

app.use('/data', (req, res) => {
  res.json(JSON.stringify(dataUpdated));
});

app.use('/update', (req, res) => {
  res.json(lastUpdate);
});

app.use(express.json({ extends: true }));

if (process.env.NODE_ENV === 'production') {
  app.use('/', express.static('client/build'));

  app.get('*', (req, res) => {
    res.redirect('/');
  });
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`App started on port ${PORT}...`);
  getData();
  setInterval(getData, 300000);
});

async function getItem(item) {
  try {
    const response = await axios.get(
      `https://bad-api-assignment.reaktor.com/v2/products/${item}`
    );
    console.log(item, response.data.length);

    const res = response.data;

    for (let i = 0; i < res.length; i++) {
      let key = res[i].manufacturer;

      if (!data.manufacturers[key]) {
        data.manufacturers[key] = key;
      }
    }
    data.items[item] = res;
  } catch (error) {
    console.error(error);
    data.items[item] = [];
  }
  console.log('manufacturers', data.manufacturers);
}

async function getManufacturer() {
  const keys = Object.keys(data.manufacturers);

  for (let i = 0; i < keys.length; i++) {
    let key = keys[i];
    let res = {};
    try {
      do {
        res = await axios.get(
          `https://bad-api-assignment.reaktor.com/v2/availability/${key}`
        );
        console.log(key, res.data.response.length);
        data.manufacturers[key] = res.data.response;
      } while (res.data.response.length < 3);
    } catch (error) {
      console.error(error);
      data.manufacturers[key] = [];
    }
  }
}

function editDataManufacturer(editData) {
  const keys = Object.keys(editData);
  for (let i = 0; i < keys.length; i++) {
    let key = keys[i];
    let manufacturer = {};
    for (let n = 0; n < editData[key].length; n++) {
      let id = editData[key][n].id.toLowerCase();
      let datapayload = editData[key][n].DATAPAYLOAD;
      manufacturer[id] = getXmlValue(datapayload.toLowerCase(), 'instockvalue');
    }
    data.manufacturers[key] = manufacturer;
  }
}

const getXmlValue = function (str, key) {
  return str.substring(
    str.lastIndexOf('<' + key + '>') + ('<' + key + '>').length,
    str.lastIndexOf('</' + key + '>')
  );
};

async function getData() {
  data.items = {};
  data.manufacturers = {};
  await Promise.all([
    getItem('beanies'),
    getItem('gloves'),
    getItem('facemasks'),
  ]);
  await getManufacturer();
  editDataManufacturer(data.manufacturers);
  const date = new Date();
  lastUpdate = date.toUTCString();
  dataUpdated.items = data.items;
  dataUpdated.manufacturers = data.manufacturers;
  dataUpdated.update = lastUpdate;
}
