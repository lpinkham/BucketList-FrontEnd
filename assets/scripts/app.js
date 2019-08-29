'use strict'

// use require with a reference to bundle the file and use it in this file
const authEvents = require('./auth/events')
const ui = require('./auth/ui')

$(() => {
  // user auth
  $('#sign-up').on('submit', authEvents.onSignUp)
  $('#sign-in').on('submit', authEvents.onSignIn)
  $('#change-password').on('submit', authEvents.onChangePassword)
  $('#sign-out').on('submit', authEvents.onSignOut)

  // create and view are used on the main html page. these will always be needed
  $('#create-a-bucket-btn').on('click', ui.onCreateABucket)
  $('#view-your-buckets-btn').on('click', authEvents.onGetYourBuckets)

  // create a bucket form
  $('#create-bucket').on('submit', authEvents.onCreateBucket)

  // this is the Edit and delete button from the show all buckets handlebars
  $('.content').on('click', '.edit-btn', authEvents.onEditBucket)
  $('.content').on('click', '.delete-btn', authEvents.onDeleteYourBucket)

  // this is the Update button from the edit bucket handlebars
  $('.content').on('submit', '.update-bucket', authEvents.onUpdateBucket)
})
