module.exports = {
  async up(db, client) {
    // TODO write your migration here.
    await db.collection('users').insertOne({
      name: 'Manager',
      email: 'manager@gmail.com',
      phone: '1234567890',
      password: '$2a$10$otzpsmvqlFNC7FLxPPOZ4uWNR/TOl9RIotUOIrpfSrR1hR1nQ0ka6',
      isAdmin: true,
      gen: true,
      date: new Date()
    })
    // See https://github.com/seppevs/migrate-mongo/#creating-a-new-migration-script
    // Example:
    // await db.collection('albums').updateOne({artist: 'The Beatles'}, {$set: {blacklisted: true}});
  },

  async down(db, client) {
    // TODO write the statements to rollback your migration (if possible)
    await db.collection('users').findOneAndDelete({
      email: 'manager@gmail.com'
    })
    // Example:
    // await db.collection('albums').updateOne({artist: 'The Beatles'}, {$set: {blacklisted: false}});
  }
};
