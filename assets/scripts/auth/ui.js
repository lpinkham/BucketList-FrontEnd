'use strict'

const store = require('../store')
const showBucketTemplate = require('../templates/bucket-list.handlebars')
const showEditBucketTemplate = require('../templates/bucket-list-edit.handlebars')

const signUpSuccessful = responseData => {
  successMessage('You registered successfully')
}

const signUpFailure = responseData => {
  failureMessage('We were unable to complete your registration')
}

const signInSuccessful = responseData => {
  store.user = responseData.user
  $('#form').trigger('reset')
  $('#message').hide()
  $('#headingSignInUp').hide()
  $('#headingSignoutChangePW').show()
  $('#Home-Page').hide()
  $('#Create-A-Bucket').show()
}

const signInFailure = responseData => {
  failureMessage('Your email or password is incorrect.')
}

const changePasswordSuccessful = responseData => {
  successMessage('You changed your password successfully')
}

const changePasswordFailure = responseData => {
  failureMessage('Please try again. We were unable to change your password')
}

const signOutSuccessful = () => {
  $('form').trigger('reset')
  $('#headingSignInUp').show()
  $('#headingSignoutChangePW').hide()
  $('#message').hide()
  $('#Home-Page').show()
  $('#Create-A-Bucket').hide()
}

const signOutFailure = () => {
  failureMessage('Your sign out failed. You are still logged in. Please try again.')
}

const successMessage = message => {
  $('#message').show()
  $('#message').text(message)
  $('#message').removeClass('failure')
  $('#message').addClass('success')
  $('#message').css('color', 'green')
  $('form').trigger('reset')
}

const failureMessage = message => {
  $('#message').show()
  $('#message').text(message)
  $('#message').removeClass('success')
  $('#message').addClass('failure')
  $('#message').css('color', 'red')
  $('form').trigger('reset')
}

const hideMessage = () => {
  $('#message').hide()
}

const createdBucketSuccess = () => {
  successMessage('created a bucket!')
}

const createdBucketFailure = () => {
  failureMessage('created a bucket FAILED!')
}

// const editBucketUI = (data) => {
//   console.log('data is ', data)
//   const showEditBucketHtml = showEditBucketTemplate({ buckets: data.buckets })
//   $('.content').html('')
//   $('.content2').html(showEditBucketHtml)
//   $('form').trigger('reset')
// }

const getBucketSuccess = (data) => {
  // console.log('data inside getBucketSuccess is ', data)
  $('.content').show()
  if (data.buckets.length === 0) {
    failureMessage('Sorry, you have not created any buckets yet. Please add some and try again.')
    $('.content').html('')
    $('form').trigger('reset')
  } else {
    successMessage('Your buckets are listed below.')
    const showBucketHtml = showBucketTemplate({ buckets: data.buckets })
    $('.content').html(showBucketHtml)
    $('form').trigger('reset')
  }
}

const getBucketFailure = responseData => {
  failureMessage('We were unable to retrieve your buckets.')
  $('form').trigger('reset')
}

const getSingleBucketSuccess = (data) => {
  // console.log('data inside ui.getSingleBucketSuccess is ', data)
  // replace the contents of the section that the id came from with an editable form
  // and pre-load the data.
  $('.content2').html('')
  const showEditBucketHTML = showEditBucketTemplate({ bucket: data.bucket })
  $('.content2').html(showEditBucketHTML)
  $('form').trigger('reset')
}

const getSingleBucketFailure = responseData => {
  failureMessage('We were unable to retrieve your bucket.')
  $('form').trigger('reset')
}

const deleteBucketSuccess = responseData => {
  failureMessage('Your bucket has been deleted')
  $('form').trigger('reset')
}

const deleteBucketFailure = responseData => {
  failureMessage('We were unable to delete your bucket.')
  $('form').trigger('reset')
}

const testShowEditBucketForm = responseData => {
  // console.log('responseData is ', responseData)
  console.log('complete by is ', responseData.bucket.completeBy)
  $('#edit-a-bucket').show()
  $('#edit-bucket-id').val(responseData.bucket._id)
  $('#edit-bucket-title').val(responseData.bucket.title)
  $('#edit-bucket-place').val(responseData.bucket.place)
  $('#edit-bucket-description').val(responseData.bucket.description)
  $('#edit-bucket-shareWith').val(responseData.bucket.shareWith)
  $('#edit-bucket-completeBy').val(responseData.bucket.completeBy)
  $('#edit-bucket-completed').val(responseData.bucket.completed)
  $('.content').hide()
}

// trying to get an edit form in handlebars
const editHandlebarsFunction = responseData => {
  // $('#' + responseData.bucket._id).css('background', 'red')
  const showEditBucketHTML = showEditBucketTemplate({ bucket: responseData.bucket })
  $(`#${responseData.bucket._id}`).html(showEditBucketHTML)
  // $(`#${responseData.bucket._id}`).css('background', 'red')
  $(`#${responseData.bucket._id}`).html()
// console.log(responseData)
}

const updateSingleBucketSuccess = responseData => {
  successMessage('Your bucket has been updated successfully')
  $('form').trigger('reset')
}
const updateSingleBucketFailure = responseData => {
  failureMessage('We were unable to update your bucket.')
  $('form').trigger('reset')
}

module.exports = {
  signUpSuccessful,
  signUpFailure,
  signInSuccessful,
  signInFailure,
  changePasswordSuccessful,
  changePasswordFailure,
  signOutSuccessful,
  signOutFailure,
  successMessage,
  failureMessage,
  hideMessage,
  createdBucketSuccess,
  createdBucketFailure,
  getBucketSuccess,
  getBucketFailure,
  getSingleBucketSuccess,
  getSingleBucketFailure,
  deleteBucketSuccess,
  deleteBucketFailure,
  testShowEditBucketForm,
  updateSingleBucketSuccess,
  updateSingleBucketFailure,
  editHandlebarsFunction
}
