'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await queryInterface.bulkInsert('Books',[
      {
        title:'hallo',
        author:'hasa',
        publisher:'sasa',
        year:'2022',
        pages:'212',
        image:'',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title:'HAHAHHA',
        author:'bbaas',
        publisher:'iwe',
        year:'1999',
        pages:'100',
        image:'',
        createdAt: new Date(),
        updatedAt: new Date()
      },
     ], {})
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Books', null, {});
  }
};
