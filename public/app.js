const toCurrency = price => {
    return new Intl.NumberFormat('ru-RU', {
        currency: 'rub',
        style: 'currency'
    }).format(price)
}

const toDate = date => {
    return new Intl.DateTimeFormat('ru-RU', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    }).format(new Date(date));
}

document.querySelectorAll('.price').forEach(node => {
    node.textContent = toCurrency(node.textContent)
});

document.querySelectorAll('.date').forEach(node => {
    node.textContent = toDate(node.textContent)
});

const $cart = document.querySelector('#cart');
if($cart) {
    $cart.addEventListener('click', async event => {
        if(event.target.classList.contains('cart-course-remove')) {
            const id = event.target.dataset.id;

            let response = await fetch('/cart/remove/' + id, { method: 'delete'});
            let cart = await response.json();
            if(cart.items.length) {
                const html = cart.items.map(c => `
                    <tr>
                        <td>${c.title}</td>
                        <td>${c.price}</td>
                        <td>${c.count}</td>
                        <td style="max-width: 70px">
                            <a href="/courses/${c._id}" class="btn btn-primary">More</a>
                            <button class="btn btn-warning cart-course-remove" data-id="${c._id}">Delete</button>
                        </td>
                    </tr>
                `).join('');
                $cart.querySelector('tbody').innerHTML = html;
                $cart.querySelector('.price').textContent = toCurrency(cart.price);
            } else
                $cart.innerHTML = '<p>Cart is empty</p>'
        }
    });
}