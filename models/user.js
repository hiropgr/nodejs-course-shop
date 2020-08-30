const { Schema, model } = require('mongoose');

const userSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true,
    },
    cart: {
        items: [
            {
                count: {
                    type: Number,
                    required: true,
                    default: 1
                },
                courseId: {
                    type: Schema.Types.ObjectId,
                    ref: 'Course',
                    required: true
                }
            }
        ]
    }
});

userSchema.methods.addToCart = async function(course) {
    const items = [...this.cart.items];
    let ind = items.findIndex(c => c.courseId.toString() === course._id.toString());
    if(ind >= 0) 
        items[ind].count++;
    else
        items.push({
            courseId: course._id,
        });
    
    this.cart = { items };
    return this.save();
}

userSchema.methods.removeFromCart = async function(id) {
    let items = [...this.cart.items];
    let ind = items.findIndex(c => c.courseId.toString() === id.toString());
    if(ind >= 0) {
        if(items[ind].count === 1) {
            items = items.filter(c => c.courseId.toString() !== id.toString());
        } else 
            items[ind].count--;

        this.cart = { items }
        return this.save();
    }
}

userSchema.methods.clearCart = function() {
    this.cart = { items: []}
    return this.save();
}

module.exports = model('User', userSchema);