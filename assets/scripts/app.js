'use strict'

// use require with a reference to bundle the file and use it in this file
const authEvents = require('./auth/events')
const ui = require('./auth/ui')

$(() => {
  $('#sign-up').on('submit', authEvents.onSignUp)
  $('#sign-in').on('submit', authEvents.onSignIn)
  $('#change-password').on('submit', authEvents.onChangePassword)
  $('#sign-out').on('submit', authEvents.onSignOut)

  // create and view are used on the main html page. these will always be needed
  $('#create-bucket').on('submit', authEvents.onCreateBucket)
  $('#view-your-buckets-btn').on('click', authEvents.onGetYourBuckets)
  $('#create-a-bucket-btn').on('click', ui.onCreateABucket)

  // $('#view-all-buckets-btn').on('click', authEvents.onGetAllBuckets)
  // $('#get-a-bucket').on('submit', authEvents.getSingleBucket)

  // this is the Edit and delete button from the show all buckets handlebars
  $('.content').on('click', '.edit-btn', authEvents.onEditBucket)
  $('.content').on('click', '.delete-btn', authEvents.onDeleteYourBucket)
  $('.content').on('submit', '.update-bucket', authEvents.onUpdateBucket)

  // these two links are used from the main page to test edit and delete
  // once handlebars are working these won't be needed any more
  $('#edit-a-bucket').on('submit', authEvents.editSingleBucket)
  $('#delete-a-bucket').on('submit', authEvents.onDeleteYourBuckets)
})
