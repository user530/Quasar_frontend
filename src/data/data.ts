import { Advantage, NavLink, ContactInformation, SocialMedia, FAQ } from './models'
import { fabFacebook, fabTelegram, fabTwitter, fabViber, fabWhatsapp } from '@quasar/extras/fontawesome-v6'

const mainAdvantages: Advantage[] = [
    {
        icon: 'security',
        heading: 'Advantage 1',
        text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro voluptates omnis autem tenetur officia eaque soluta ipsam iusto officiis sed.Impedit itaque quidem qui totam accusantium fugit, quibusdam molestiae.Est!'
    },
    {
        icon: 'developer_board',
        heading: 'Advantage 2',
        text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro voluptates omnis autem tenetur officia eaque soluta ipsam iusto officiis sed.Impedit itaque quidem qui totam accusantium fugit, quibusdam molestiae.Est!'
    },
    {
        icon: 'computer',
        heading: 'Advantage 3',
        text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro voluptates omnis autem tenetur officia eaque soluta ipsam iusto officiis sed.Impedit itaque quidem qui totam accusantium fugit, quibusdam molestiae.Est!'
    },
    {
        icon: 'memory',
        heading: 'Advantage 4',
        text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro voluptates omnis autem tenetur officia eaque soluta ipsam iusto officiis sed.Impedit itaque quidem qui totam accusantium fugit, quibusdam molestiae.Est!'
    },
    {
        icon: 'developer_board',
        heading: 'Advantage 5',
        text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro voluptates omnis autem tenetur officia eaque soluta ipsam iusto officiis sed.Impedit itaque quidem qui totam accusantium fugit, quibusdam molestiae.Est!'
    },
    {
        icon: 'person',
        heading: 'Advantage 6',
        text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro voluptates omnis autem tenetur officia eaque soluta ipsam iusto officiis sed.Impedit itaque quidem qui totam accusantium fugit, quibusdam molestiae.Est!'
    },
]

const navigationLinks: NavLink[] = [
    { name: 'main', label: 'Main page', path: '/' },
    { name: 'about', label: 'About us', path: '/aboutus' },
    { name: 'register', label: 'Register', path: '/register' },
]

const footerContacts: ContactInformation[] = [
    { type: 'address', information: 'Some address, very important' },
    { type: 'email', information: 'some@email.com' },
    { type: 'phone', information: '+12345678901' }
]

const socialMediaLinks: SocialMedia[] = [
    { icon: fabWhatsapp, link: 'https://wa.me/1XXXXXXXXXX' },
    { icon: fabViber, link: 'viber://pa?chatURI=<URI>' },
    { icon: fabTelegram, link: 'https://t.me/+<hash>' },
    { icon: fabFacebook, link: 'https://www.facebook.com/home.php?' },
    { icon: fabTwitter, link: 'https://twitter.com' },

]

const aboutFaqs: FAQ[] = [
    { question: 'Question 1', asnwer: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim consectetur cumque nihil molestias tempore magnam praesentium earum aut numquam, aliquam, obcaecati ipsa voluptatem doloremque vel odit repellat? Provident, tempore adipisci.' },
    { question: 'Question 2', asnwer: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim consectetur cumque nihil molestias tempore magnam praesentium earum aut numquam, aliquam, obcaecati ipsa voluptatem doloremque vel odit repellat? Provident, tempore adipisci.' },
    { question: 'Question 3', asnwer: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim consectetur cumque nihil molestias tempore magnam praesentium earum aut numquam, aliquam, obcaecati ipsa voluptatem doloremque vel odit repellat? Provident, tempore adipisci.' },
    { question: 'Question 4', asnwer: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim consectetur cumque nihil molestias tempore magnam praesentium earum aut numquam, aliquam, obcaecati ipsa voluptatem doloremque vel odit repellat? Provident, tempore adipisci.' },
    { question: 'Question 5', asnwer: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim consectetur cumque nihil molestias tempore magnam praesentium earum aut numquam, aliquam, obcaecati ipsa voluptatem doloremque vel odit repellat? Provident, tempore adipisci.' },
]

export {
    mainAdvantages,
    navigationLinks,
    footerContacts,
    socialMediaLinks,
    aboutFaqs
}