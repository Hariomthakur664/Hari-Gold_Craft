const mongoose = require('mongoose');

const jewellerySchema = [
    {
        "name": "Tanishq",
        "address": "123 MG Road, Bangalore, Karnataka",
        "country": "India",
        "city": "Bangalore",
        "description": "Tanishq is India's most trusted jewelry brand, offering a wide range of gold, diamond, and platinum jewelry.",
        "specification": "Gold, Diamond, Platinum, Custom Designs",
        "image": {
            "filename": "crown-1866986_1280.jpg",
            "url": "https://cdn.pixabay.com/photo/2016/11/29/03/07/crown-1866986_1280.jpg"
        },
        "number": "8061234567"
    },
    {
        "name": "Kalyan Jewellers",
        "address": "45 Mount Road, Chennai, Tamil Nadu",
        "country": "India",
        "city": "Chennai",
        "description": "Kalyan Jewellers offers exquisite gold and diamond jewelry with unique designs and craftsmanship.",
        "specification": "Gold, Diamond, Silver, Custom Designs",
        "image": {
            "filename": "wedding-1594957_1280.jpg",
            "url": "https://cdn.pixabay.com/photo/2016/08/15/10/14/wedding-1594957_1280.jpg"
        },
        "number": "9491234567"
    },
    {
        "name": "Malabar Gold & Diamonds",
        "address": "78 Fort Road, Mumbai, Maharashtra",
        "country": "India",
        "city": "Mumbai",
        "description": "Malabar Gold & Diamonds is known for its vast collection of gold, diamond, and gemstone jewelry.",
        "specification": "Gold, Diamond, Silver, Custom Designs",
        "image": {
            "filename": "gold-necklace-display-stand.jpg",
            "url": "https://img.freepik.com/premium-photo/gold-necklace-display-stand-elegant-jewelry_752325-19451.jpg?w=740"
        },
        "number": "9823456789"
    },
    {
        "name": "PC Jeweller",
        "address": "56 Karol Bagh, New Delhi, Delhi",
        "country": "India",
        "city": "New Delhi",
        "description": "PC Jeweller offers a stunning range of gold, diamond, and silver jewelry with intricate designs.",
        "specification": "Gold, Diamond, Platinum, Silver, Custom Designs",
        "image": {
            "filename": "young-woman-earrings-gems.jpg",
            "url": "https://img.freepik.com/free-photo/portrait-young-woman-with-earrings-with-gems-isolated_132075-10060.jpg?t=st=1722596255~exp=1722599855~hmac=c3c0be7c916e6f57f3325e048e22a6ee9d51b65751bc0ade550220aae6d06f07&w=360"
        },
        "number": "9812345678"
    },
    {
        "name": "Joyalukkas",
        "address": "89 Park Street, Kolkata, West Bengal",
        "country": "India",
        "city": "Kolkata",
        "description": "Joyalukkas is a renowned jewelry brand offering a wide range of gold, diamond, and platinum jewelry.",
        "specification": "Gold, Diamond, Platinum, Custom Designs",
        "image": {
            "filename": "beautiful-girl-bridal-dress.jpg",
            "url": "https://img.freepik.com/premium-photo/beautiful-girl-wearing-traditional-bridal-dress-with-jewelry_615731-7800.jpg?w=740"
        },
        "number": "9887654321"
    },
    {
        "name": "Swarovski",
        "address": "101 Connaught Place, New Delhi, Delhi",
        "country": "India",
        "city": "New Delhi",
        "description": "Swarovski is known for its luxurious crystal jewelry and accessories.",
        "specification": "Silver",
        "image": {
            "filename": "gold-stone-earring.jpg",
            "url": "https://img.freepik.com/premium-photo/gold-stone-earring-minimalistic-background_271326-735.jpg?w=826"
        },
        "number": "9901234567"
    },
    {
        "name": "Tribhovandas Bhimji Zaveri",
        "address": "45 Zaveri Bazaar, Mumbai, Maharashtra",
        "country": "India",
        "city": "Mumbai",
        "description": "Tribhovandas Bhimji Zaveri offers a wide range of traditional and modern jewelry.",
        "specification": "Gold, Diamond, Silver",
        "image": {
            "filename": "diamond-jewelry-luxury.jpg",
            "url": "https://img.freepik.com/premium-photo/diamond-jewelry-luxury-fashion-jewelry-ai-generative_1180783-4351.jpg?w=360"
        },
        "number": "9823456789"
    },
    {
        "name": "Jos Alukkas",
        "address": "23 Alappuzha Road, Kochi, Kerala",
        "country": "India",
        "city": "Kochi",
        "description": "Jos Alukkas specializes in gold and diamond jewelry with a reputation for quality and trust.",
        "specification": "Gold, Diamond, Custom Designs",
        "image": {
            "filename": "traditional-bridal-dress.jpg",
            "url": "https://img.freepik.com/premium-photo/beautiful-girl-wearing-traditional-bridal-dress-with-jewelry_615731-7742.jpg?ga=GA1.1.363323832.1722354803&semt=ais_hybrid"
        },
        "number": "9741234567"
    },
    {
        "name": "Amrapali",
        "address": "90 Hauz Khas Village, New Delhi, Delhi",
        "country": "India",
        "city": "New Delhi",
        "description": "Amrapali offers a unique blend of traditional and contemporary jewelry designs.",
        "specification": "Gold, Diamond, Custom Designs",
        "image": {
            "filename": "amrapali-jewelry.jpg",
            "url": "https://www.ansjewelry.com/_next/static/images/03-730046934ff99e0ae480b2ed3414a430.jpg.webp"
        },
        "number": "9812345679"
    },
    {
        "name": "GRT Jewellers",
        "address": "67 T Nagar, Chennai, Tamil Nadu",
        "country": "India",
        "city": "Chennai",
        "description": "GRT Jewellers is known for its extensive collection of gold, diamond, and platinum jewelry.",
        "specification": "Gold, Diamond, Platinum, Custom Designs",
        "image": {
            "filename": "grt-jewellers.jpg",
            "url": "https://media.debeers.com/v/debeers/mobile-el-awakening-video?protocol=https"
        },
        "number": "9387654321"
    },
    {
        "name": "P. N. Gadgil Jewellers",
        "address": "32 Sadashiv Peth, Pune, Maharashtra",
        "country": "India",
        "city": "Pune",
        "description": "P. N. Gadgil Jewellers offers traditional and modern gold and diamond jewelry.",
        "specification": "Gold, Diamond, Silver",
        "image": {
            "filename": "lipi-sankalp-mangalsutra.jpg",
            "url": "https://www.kalyanjewellers.net/images/Jewellery/Chains/images/Lipi-Sankalp-Gold-Mangalsutra-Necklace.jpg"
        },
        "number": "9823456789"
    },
    {
        "name": "Kirana Jewellers",
        "address": "27 Brigade Road, Bangalore, Karnataka",
        "country": "India",
        "city": "Bangalore",
        "description": "Kirana Jewellers provides a range of gold and diamond jewelry with classic designs.",
        "specification": "Gold, Diamond",
        "image": {
            "filename": "minoan-sun-pendant.jpg",
            "url": "https://cdn.britannica.com/40/8240-050-7F18ACD9/pendant-bees-Minoan-Sun-tomb-granulation-Mallia.jpg"
        },
        "number": "9988776655"
    },
    {
        "name": "Senco Gold & Diamonds",
        "address": "51 Chowringhee Road, Kolkata, West Bengal",
        "country": "India",
        "city": "Kolkata",
        "description": "Senco Gold & Diamonds is known for its exquisite gold and diamond jewelry.",
        "specification": "Gold, Diamond, Silver, Custom Designs",
        "image": {
            "filename": "senco-gold-diamonds.jpg",
            "url": "https://res.cloudinary.com/dfkpt3jmx/image/upload/v1725370298/Hari-GoldCraft/utrx550xwasred17qnds.jpg"
        },
        "number": "9832456789"
    }
];



// const Jewellerylist = mongoose.model("Jewellerylist", jewellerySchema);

module.exports = {data : jewellerySchema};
