const functions = require('firebase-functions');


// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });


const express = require('express')
const cors = require('cors')
const stripe = require('stripe')('sk_test_51HgwewKaMEhVDFsoWCzkAWz0xGHbhoIKocA7eYaHwtuKrWcAM7iMmXQQ3Pv9lPgXYhfVdw3IHOLBUOyRdaYrpRTV00iQZ6BdnC')


const app = express()

app.use(cors())

app.use(express.json())


app.get('/', (req, res) => {
    res.status(200).send('Hello World')
})

app.post('/payments/create', async (req, res) => {
    const total = req.query.total;
    console.log('total amount paid', total)

    const paymentIntent = await stripe.paymentIntents.create({
        amount: total,
        currency: 'inr'
    })

    res.status(201).send({
        clientSecret: paymentIntent.client_secret
    })

})

exports.api = functions.https.onRequest(app)
