const Nominal = require('./model');

module.exports = ({
    index : async (req, res) => {
        try {

            const alertMessage = req.flash("alertMessage");
            const alertStatus = req.flash("alertStatus");

            const nominal = await Nominal.find();
            const alert = {message: alertMessage, status: alertStatus}

            res.render('admin/nominal/view_nominal', {
                nominal,
                alert
            })
        } catch (err) {
            req.flash('alertMessage', `${err.message}`)
            req.flash('alertStatus', 'danger')
            res.redirect('/nominal')
        }
    }, 

    viewCreate : async (req, res) => {
        try {

            res.render('admin/nominal/create')
        } catch (err) {
            req.flash('alertMessage', `${err.message}`)
            req.flash('alertStatus', 'danger')
            res.redirect('/nominal')
        }
    },

    actionCreate : async (req, res) => {
        try {
            const {coinQuantity, coinName, price} = req.body
            
            let nominal = await Nominal({coinQuantity, coinName, price})
            await nominal.save();

            req.flash('alertMessage', 'Nominal Created Successfully')
            req.flash('alertStatus', 'success');

            res.redirect('/nominal');
        } catch (err) {
            req.flash('alertMessage', `${err.message}`)
            req.flash('alertStatus', 'danger')
            res.redirect('/nominal')
        }
    },

    viewEdit : async (req, res) => {
        try {
            const {id} = req.params

            const nominal = await Nominal.findOne({_id: id});
            res.render('admin/nominal/edit', {
                nominal
            })
        } catch (err) {
            req.flash('alertMessage', `${err.message}`)
            req.flash('alertStatus', 'danger')
            res.redirect('/nominal')
        }
    }, 

    actionEdit : async (req, res) => {
        try {
            const {id} = req.params;
            const {coinName, coinQuantity, price} = req.body;

            await Nominal.findOneAndUpdate({
                _id: id},
                {coinName, coinQuantity, price});
                req.flash('alertMessage', 'Nominal Update Successfully')
                req.flash('alertStatus', 'success')
                res.redirect('/nominal')
        } catch (err) {
            req.flash('alertMessage', `${err.message}`)
            req.flash('alertStatus', 'danger')
            res.redirect('/nominal')
        }
    }, 

    actionDelete : async(req, res) => {
        try {
            const {id} = req.params

            await Nominal.deleteOne({_id: id})
            req.flash('alertMessage', 'Nominal Delete Successfully')
            req.flash('alertStatus', 'success');
            res.redirect('/nominal')
        } catch (err) {
            req.flash('alertMessage', `${err.message}`);
            req.flash('alertStatus', 'danger');
            res.redirect('/nominal')
        }
    }

})