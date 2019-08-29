'use strict'

const config = require('../config')
const store = require('../store')

const signUp = formData => {
  return $.ajax({
    url: config.apiUrl + '/sign-up',
    data: formData,
    method: 'POST'
  })
}

const signIn = formData => {
  return $.ajax({
    url: config.apiUrl + '/sign-in',
    data: formData,
    method: 'POST'
  })
}

const changePassword = formData => {
  return $.ajax({
    url: config.apiUrl + '/change-password',
    data: formData,
    method: 'PATCH',
    headers: {
      Authorization: 'Token token=' + store.user.token
    }
  })
}

const signOut = () => {
  return $.ajax({
    url: config.apiUrl + '/sign-out',
    method: 'DELETE',
    headers: {
      Authorization: 'Token token=' + store.user.token
    }
  })
}

const createNewBucket = formData => {
  return $.ajax({
    url: config.apiUrl + '/buckets',
    method: 'POST',
    headers: {
      Authorization: 'Token token=' + store.user.token
    },
    data: formData
  })
}

const getYourBuckets = () => {
  return $.ajax({
    url: config.apiUrl + '/buckets',
    method: 'GET',
    headers: {
      Authorization: 'Token token=' + store.user.token
    }
  })
}

const getSingleBucket = id => {
  // console.log('in getSingleBucket')
  return $.ajax({
    url: config.apiUrl + '/buckets/' + id,
    method: 'GET',
    headers: {
      Authorization: 'Token token=' + store.user.token
    }
  })
}

const updateBucket = formData => {
  return $.ajax({
    url: config.apiUrl + '/buckets/' + formData.bucket._id,
    method: 'PATCH',
    headers: {
      Authorization: 'Token token=' + store.user.token
    },
    data: formData
  })
}

const deleteBucket = function (formData) {
  return $.ajax({
    url: config.apiUrl + '/buckets/' + formData.bucket._id,
    method: 'DELETE',
    headers: {
      Authorization: 'Token token=' + store.user.token
    }
  })
}
const deleteBucketHandlebars = function (id) {
  return $.ajax({
    url: config.apiUrl + '/buckets/' + id,
    method: 'DELETE',
    headers: {
      Authorization: 'Token token=' + store.user.token
    }
  })
}

// const getAllBuckets = () => {
//   return $.ajax({
//     url: config.apiUrl + '/buckets',
//     method: 'GET'
//   })
// }

module.exports = {
  signUp,
  signIn,
  changePassword,
  signOut,
  createNewBucket,
  updateBucket,
  deleteBucket,
  getYourBuckets,
  getSingleBucket,
  deleteBucketHandlebars
}
