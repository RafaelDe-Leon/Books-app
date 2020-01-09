export default function(session, RedisStore, client){
  return session({ 
    store: new RedisStore({client}),
    name:'__id',
    secret: 'keyboard cat',
    cookie: {httpOnly: false, maxAge: 1000 * 60 * 60 * 24},
    resave: true,
    saveUninitialized: true
  })
}