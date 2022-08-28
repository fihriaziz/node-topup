const Payment = require('./model')
const Bank = require('../bank/model')

module.exports = ({
    index: async(req, res) => {
        try {
            const alertMessage = req.flash('alertMessage')
            const alertStatus = req.flash('alertStatus')

            const payment = await Payment.find().populate('banks')
            const alert = {message: alertMessage, status: alertStatus}
            // console.log(payment);
            res.render('admin/payment/view_payment', {
                payment,alert
            })
        } catch (err) {
            req.flash('alertMessage', `${err.message}`)
            req.flash('alertStatus', 'danger')
            res.redirect('/payment')
        }
    },
    viewCreate: async(req, res) => {
        try {
            const banks = await Bank.find()
            res.render('admin/payment/create', {
                banks
            })
        } catch (err) {
            req.flash('alertMessage', `${err.message}`)
            req.flash('alertStatus', 'danger')
            res.redirect('/payment')
        }
    },
    actionCreate: async(req, res) => {
        try {
            const {type, banks} = req.body
            let payment = await Payment({type, banks})
            payment.save()

            req.flash('alertMessage','Berhasil')
            req.flash('alertStatus','success')

            res.redirect('/payment')
        } catch (err) {
            req.flash('alertMessage',  `${err.message}`)
            req.flash('alertStatus', 'danger')
        }
    },
    viewEdit : async(req, res) => {
        try {
            const {id} = req.params

            const banks = await Bank.find()
            const payment = await Payment.findOne({_id: id})
            .populate('banks')
            res.render('admin/payment/edit', {
                payment, banks
            })
        } catch (err) {
            req.flash('alertMessage', `${err.message}`)
            req.flash('alertStatus', 'danger')
        }
    },
    actionEdit : async(req, res) => {
        try {
            const {id} = req.params
            const {type, banks} = req.body
            await Payment.findOneAndUpdate({_id: id}, {type, banks})

            req.flash('alertMessage','update berhasil')
            req.flash('alertStatus', 'success')

            res.redirect('/payment')
        } catch (err) {
            req.flash('alertMessage', `${err.message}`)
            req.flash('alertStatus', 'danger')
        }
    },
    actionDelete : async(req, res) => {
        try {
            const {id} = req.params
            await Payment.deleteOne({_id: id})

            req.flash('alertMessage', 'Delete berhasil')
            req.flash('alertStatus', 'success')
            
            res.redirect('/payment')
        } catch (err) {
            req.flash('alertMessage', `${err.message}`)
            req.flash('alertStatus', 'danger')
            res.redirect('/payment')
        }
    }
})