// allows us to use firebase
let firebase = require(`./firebase`)

// /.netlify/functions/courses?courseNumber=KIEI-451
exports.handler = async function(event) {

  // get the activity type being requested
  let activity = event.queryStringParameters.activity

  // establish a connection to firebase in memory
  let db = firebase.firestore() 

  // ask Firebase for the course that corresponds to the course number, wait for the response
  let courseQuery = await db.collection('courses').where(`courseNumber`, `==`, courseNumber).get()

  // get the first document from the query
  let course = courseQuery.docs[0]

  // get the id from the document
  let courseId = course.id

  // get the data from the document
  let courseData = course.data()

  // create an object with the course data to hold the return value from our lambda
  let returnValue = {
    courseNumber: courseData.courseNumber,
    name: courseData.name,
    sections: [],
    courseReviewSummary: []
  }

  // ask Firebase for the sections corresponding to the Document ID of the course, wait for the response
  let sectionsQuery = await db.collection('sections').where(`courseId`, `==`, courseId).get()

  // get the documents from the query .docs turns courseQuery into array
  let sections = sectionsQuery.docs

  //Create a counter to track the total number of reviews per course
  let countCourseReviews = 0
  //Create a counter to track the sum of ratings per course
  let sumCourseRatings = 0

  // loop through the documents
  for (let sectionIndex=0; sectionIndex < sections.length; sectionIndex++) {
    // get the document ID of the section
    let sectionId = sections[sectionIndex].id

    // get the data from the section
    let sectionData = sections[sectionIndex].data()
    
    // create an Object to be added to the return value of our lambda
    let sectionObject = {
      lecturerName: "",
      sectionReviews: [],
      sectionReviewSummary: []
    }

    // ask Firebase for the lecturer with the ID provided by the section; hint: read "Retrieve One Document (when you know the Document ID)" in the reference
    let lecturerQuery = await db.collection('lecturers').doc(sectionData.lecturerId).get()

    // get the data from the returned document
    let lecturer = lecturerQuery.data()

    // add the lecturer's name to the section Object
    sectionObject.lecturerName = lecturer.name

    // add the section Object to the return value
    returnValue.sections.push(sectionObject)

    // 🔥 your code for the reviews/ratings goes here

    // ask Firebase for the reviews corresponding to the section ID of the course, wait for the response
    let reviewsQuery = await db.collection('reviews').where(`sectionId`, `==`, sectionId).get()

    // get the documents from the query ().docs turns reviews Query into array)
    let reviews = reviewsQuery.docs

    //Create counters to track total number of reviews per section and sum of ratings per section
    let countSectionReviews = 0
    let sumSectionRatings = 0

    //loop through the reviews
    for(reviewIndex = 0; reviewIndex < reviews.length; reviewIndex++) {
      //get the document id of each review
      let reviewId = reviews[reviewIndex].id

      // get the data from each review
      let reviewData = reviews[reviewIndex].data()

      //create an object to be added to the return value of our lambda
      let reviewObject = {
        body: reviewData.body,
        rating: reviewData.rating
      }

      // add to counters
      countSectionReviews = countSectionReviews + 1
      sumSectionRatings = sumSectionRatings + Number(reviewObject.rating)
      countCourseReviews = countCourseReviews + 1
      sumCourseRatings = sumCourseRatings + Number(reviewObject.rating)

      // add the review object to the section objec
      sectionObject.sectionReviews.push(reviewObject)
    }
    // create a section review summary object
    let sectionReviewSummaryObject = {
      numberOfSectionReviews: countSectionReviews,
      averageSectionReviewRating: sumSectionRatings/countSectionReviews
    }
    //add the section review summary object to the section object
    sectionObject.sectionReviewSummary.push(sectionReviewSummaryObject)
  }

  // create a course review summary object
  let courseReviewSummaryObject = {
    numberOfCourseReviews: countCourseReviews,
    averageCourseReviewRating: sumCourseRatings/countCourseReviews
  }
  //add the course review summary object to the return value
  returnValue.courseReviewSummary.push(courseReviewSummaryObject)

  // return the standard response 
  return {
    statusCode: 200,
    body: JSON.stringify(returnValue)
  }
}
