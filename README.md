# WebStore by Azam Ali

A responsive static website storefront for showcasing and selling ready-made website designs.

## Included
- Responsive homepage and navigation
- Six sample website packages with editable prices
- Category filters, search and sorting
- Cart stored for the browser session
- WhatsApp enquiry checkout (not an online payment gateway)
- Contact form that opens WhatsApp with the visitor's enquiry pre-filled
- About, process, FAQ and contact sections
- No build tools or dependencies required

## Personal contact details already configured
- Email: azamali8294@gmail.com
- Phone / WhatsApp: +91 82942 41261

## Run locally
Open `index.html` in a browser. Internet is only needed for Google Fonts and WhatsApp/email links.

## Publish free with GitHub Pages
1. Sign in at https://github.com and create a **public** repository, e.g. `webstore`.
2. Upload all files and the `assets` folder from this package to the repository root.
3. Open repository **Settings → Pages**.
4. Under **Build and deployment**, choose **Deploy from a branch**, branch `main`, folder `/(root)`, then Save.
5. Wait for the deployment to finish. GitHub Pages shows your public URL, usually `https://YOUR-USERNAME.github.io/webstore/`.

Alternative static hosting: Cloudflare Pages or Netlify. Upload the unzipped folder or connect the GitHub repository.

## Before going live
1. Replace sample package prices, names, descriptions and mock preview artwork in `index.html` and `script.js` with your actual offers.
2. Verify your WhatsApp number and email.
3. Add your own portfolio, real customer reviews only with permission, privacy notice, terms, refund/cancellation policy and clear scope/delivery timeline.
4. Test every link and test the website on a phone.
5. Consider a custom domain if desired (usually paid).

## Important functionality notes
- The cart is an **enquiry cart**. “Enquire on WhatsApp” sends the selected packages and estimated total to WhatsApp. It does not charge a customer.
- The contact form opens WhatsApp with the enquiry pre-filled. The visitor must press Send in WhatsApp; messages are not sent automatically or stored on a server.
- No admin dashboard, user accounts, database, automated file delivery or payment processing is included.
- Do not promise hosting/domain, source files, revisions or support unless you have agreed to provide them. Confirm final scope and price with the customer before payment.
- If you want online payments, connect a payment provider (for example, Razorpay) using its official integration and a secure backend. Never put secret API keys in frontend JavaScript.
