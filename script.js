
class Philosopher{
    constructor(name='John Doe',quotes=null){
        this.name=name;
        this.quotes=quotes;
    }
}
class PhilosophersStore{
    static getPhilosophers(){
        let philosophers;
        if(localStorage.getItem('philosophers')===null){
            philosophers=[];
        }else{
            philosophers=JSON.parse(localStorage.getItem('philosophers'));
        }
        return philosophers;
    }
    static addPhilosopher(newPhilosopher){
    
        const philosophers=PhilosophersStore.getPhilosophers();
         if(philosophers.find((philosopher)=>{return philosopher.name===newPhilosopher.name })===undefined){
             philosophers.push(newPhilosopher);
            localStorage.setItem('philosophers',JSON.stringify(philosophers));
         }
    }
    static removePhilosopher(philosopherName){
        let philosophers=PhilosophersStore.getPhilosophers();
        let filteredPhilosophers = philosophers.filter(philosopher => philosopherName!==philosopher.name);
        localStorage.setItem('philosophers',filteredPhilosophers);
    }
}


function randQuote(){
    let cur = showingQuote.innerHTML;
    let newQuote =curPhilosopher.quotes[Math.floor(Math.random() * curPhilosopher.quotes.length)];    
    while(curPhilosopher.quotes.length>1 && newQuote===cur){
        newQuote =curPhilosopher.quotes[Math.floor(Math.random() * curPhilosopher.quotes.length)];
    }
    showingQuote.innerHTML=newQuote;
    quotesStack.push(newQuote);    
}

function randPhilosopher(){
    
    let newPhilosopher = philosophers[Math.floor(Math.random()*philosophers.length)];
    while(newPhilosopher===curPhilosopher){//must be at least two philosophers to prevent infinte loop
        newPhilosopher = philosophers[Math.floor(Math.random()*philosophers.length)];
    }
    curPhilosopher=newPhilosopher;
    quotesTitle.innerHTML=newPhilosopher.name;
    newPhilosopher.quotes===null? showingQuote.innerHTML="No quotes add yet": showingQuote.innerHTML=newPhilosopher.quotes[0];
    quotesStack=[];
    quotesStack.push(newPhilosopher.quotes[0]);
}

function getPrevQuote(){
    quotesStack.pop();
    const temp = quotesStack.pop();
    quotesStack.push(temp);
    if(temp!=undefined){
        
        showingQuote.innerHTML=temp;
    }
}
function addQuote(){
    
    const name = document.getElementById('input-name').value;;
    const quote = document.getElementById('input-quote').value;
    
    
    let philosopher = philosophers.find((philosopher)=>{return philosopher.name===name });
    
    if(philosopher===undefined){
        philosopher=new Philosopher(name,[]);
        philosopher.quotes.push(quote);
        philosophers.push(philosopher);
    }else{
        philosopher.quotes.push(quote);
    }
    showingQuote.innerHTML=quote;
    quotesTitle.innerHTML=name;
    quotesStack.push(quote);
    curPhilosopher=philosopher;
    PhilosophersStore.addPhilosopher(philosopher);

}



/*default...*/
const quotesSocrates =[
    'I only wish that wisdom were the kind of thing that flowed … from the vessel that was full to the one that was empty.',
    'It would be better for me... that multitudes of men should disagree with me rather than that I, being one, should be out of harmony with myself.',
    'Wonder is the feeling of a philosopher, and philosophy begins in wonder.',
    'Anyone who holds a true opinion without understanding is like a blind man on the right road.',
    'The unexamined life is not worth living for a human being.'
]
const quotesAristotle=[
    'In all things of nature there is something of the marvelous.',
    'The best friend is he that, when he wishes a person\'s good, wishes it for that person\'s own sake.',
    'Happiness is thought to depend on leisure; for we are busy that we may have leisure, and make war that we may live in peace.',
]


let philosophers=[
    new Philosopher('Socrates',quotesSocrates),
    new Philosopher('Aristotle',quotesAristotle),
    ]

philosophers.forEach(philosopher=>PhilosophersStore.addPhilosopher(philosopher));
philosophers =PhilosophersStore.getPhilosophers();
let curPhilosopher = philosophers[0];





const quotesTitle = document.getElementById('quotes-title');
const showingQuote = document.getElementById('quote');
const nextBtn = document.getElementById('next-quote-btn');
const prevBtn = document.getElementById('prev-quote-btn');
const changePhilosopherBtn = document.getElementById('next-philosopher-btn');
const form = document.getElementById('add-quote');

const dropDownBtn = document.querySelector('.dropdown-menu');


let quotesStack=[];

window.onload=randQuote;
nextBtn.addEventListener('click',randQuote);
prevBtn.addEventListener('click', getPrevQuote);//should handle cases when the user chagnes the philosopher
form.addEventListener('submit',(e)=>{
    e.preventDefault();
    addQuote(e);
});     

changePhilosopherBtn.addEventListener('click',randPhilosopher);


philosophers.forEach((philosopher)=>{
    const a = document.createElement('a');
    a.classList.add('dropdown-item');
    a.href='#';
    a.innerHTML=philosopher.name;
    a.addEventListener('click',function(){
        quotesTitle.innerHTML=philosopher.name;
        curPhilosopher=philosopher;
        quotesStack=[];
        quotesStack.push(philosopher.quotes[0]);
        showingQuote.innerHTML=philosopher.quotes[0];
    });
    dropDownBtn.appendChild(a);
});