'use strict'

const getFormFields = require('../../../lib/get-form-fields')
const api = require('./api')
const ui = require('./ui')

const onSignUp = event => {
  event.preventDefault()
  const form = event.target
  const formData = getFormFields(form)
  api.signUp(formData)
    // .then(api.signIn(formData))
    // .then(ui.signInSuccessful)
    // .catch(ui.signInFailure)
    .then(ui.signUpSuccessful)
    .catch(ui.signUpFailure)
}

const onSignIn = event => {
  event.preventDefault()
  const form = event.target
  const formData = getFormFields(form)
  api.signIn(formData)
    .then(ui.signInSuccessful)
    .catch(ui.signInFailure)
}

const onChangePassword = event => {
  event.preventDefault()
  const form = event.target
  const formData = getFormFields(form)
  api.changePassword(formData)
    .then(ui.changePasswordSuccessful)
    .catch(ui.changePasswordFailure)
}

const onSignOut = event => {
  event.preventDefault()
  api.signOut()
    .then(ui.signOutSuccessful)
    .catch(ui.signOutFailure)
}

// const onGetAllBuckets = (event) => {
//   api.getAllBuckets()
//     .then(ui.getBucketSuccess)
//     .catch(ui.getBucketFailure)
// }

const onCreateBucket = event => {
  event.preventDefault()
  const form = event.target
  const formData = getFormFields(form)
  api.createNewBucket(formData)
    .then(ui.createdBucketSuccess)
    .catch(ui.createdBucketFailure)
}

const onGetYourBuckets = (event) => {
  event.preventDefault()
  api.getYourBuckets()
    .then(ui.getBucketSuccess)
    .catch(ui.getBucketFailure)
}

// used with the delete bucket form that is on the main page. Only used while trying to get handlebars working
const onDeleteYourBuckets = (event) => {
  console.log('in onDeleteYourBuckets events.js')
  event.preventDefault()
  const form = event.target
  const formData = getFormFields(form)
  api.deleteBucket(formData)
    .then(ui.deleteBucketsSuccess)
    // .then(onGetYourBuckets)
    .catch(ui.deleteBucketsFailure)
}

// this delete is used in handlebars. It only needs the id, there is no form.
const onDeleteYourBucket = (event) => {
  console.log('in onDeleteYourBuckets events.js')
  const id = $(event.target).closest('section').data('id')
  console.log('id is', id)
  api.deleteBucketHandlebars(id)
    .then(ui.deleteBucketsSuccess)
    // .then(onGetYourBuckets)
    .catch(ui.deleteBucketsFailure)
}

const onUpdateBucket = event => {
  event.preventDefault()
  const form = event.target
  const formData = getFormFields(form)
  api.updateBucket(formData)
    .then(ui.updateBucketSuccessful)
  // .then(onGetYourBuckets)
    .catch(ui.updateBucketFailure)
}

// used in handlebars edit button
const onEditBucket = (event) => {
  const id = $(event.target).closest('section').data('id')
  console.log('id is', id)
  // make call to API using the id to get a single bucket
  // replace the one section with an editable section (edit handlebars)
  api.getSingleBucket(id)
    // .then(ui.getSingleBucketSuccess)
    // .catch(ui.getSingleBucketFailure)
    .then(ui.testShowEditBucketForm)
    .catch(ui.failureMessage('Couldnt show edit bucket form'))
}

// used for testing edit a bucket  from link on main page NOT from handlebars
const editSingleBucket = (event) => {
  // console.log('in editSingleBucket events.js')
  event.preventDefault()
  const form = event.target
  const formData = getFormFields(form)
  // const f = formData
  // console.log('f is ', f)
  api.updateBucket(formData)
    .then(ui.updateSingleBucketSuccess)
    .catch(ui.updateSingleBucketFailure)
}

// const getSingleBucket = (event) => {
//   event.preventDefault()
//   const form = event.target
//   const formData = getFormFields(form)
//   // console.log('in getSingleBucket in events.js')
//   // const f = formData
//   // console.log('f is ', f)
//   api.getSingleBucket(formData)
//     .then(ui.getSingleBucketSuccess)
//     .catch(ui.getSingleBucketFailure)
// }

module.exports = {
  onSignUp,
  onSignIn,
  onChangePassword,
  onSignOut,
  onCreateBucket,
  onGetYourBuckets,
  onUpdateBucket,
  onDeleteYourBuckets,
  onEditBucket,
  editSingleBucket,
  onDeleteYourBucket
}
