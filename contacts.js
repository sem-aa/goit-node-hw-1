const fs = require('fs').promises
const path = require('path')
const uniqid = require('uniqid')

const contactsPath = path.join(__dirname, './db/contacts.json')

function listContacts () {
  fs.readFile(contactsPath)
    .then(data => console.table(JSON.parse(data)))
    .catch(err => console.log(err.message))
}

function getContactById (contactId) {
  fs.readFile(contactsPath)
    .then(data => {
      const users = JSON.parse(data)
      const user = users.find(user => String(user.id) === String(contactId))
      console.log(user)
    }).catch(err => err.message)
}

function removeContact (contactId) {
  fs.readFile(contactsPath)
    .then(data => {
      const users = JSON.parse(data)
      if (!users.find(user => user.id === contactId)) {
        console.log('Нет такого контакта')
      }
      const newContacts = users.filter(user => String(user.id) !== String(contactId))
      fs.writeFile(contactsPath, JSON.stringify(newContacts))
        .then(console.table(newContacts))
        .catch(err => err.message)
    })
    .catch(err => err.message)
}

function addContact (name, email, phone) {
  fs.readFile(contactsPath)
    .then(data => {
      const users = JSON.parse(data)
      const newUser = {
        id: uniqid(),
        name,
        email,
        phone
      }
      users.push(newUser)
      fs.writeFile(contactsPath, JSON.stringify(users))
        .then(console.table(users))
        .catch(err => err.message)
    }
    ).catch(err => err.message)
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact
}
