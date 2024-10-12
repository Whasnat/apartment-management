const pool = require('./db');

const seedRoles = async () => {
    try {
        // Insert roles
        await pool.query(`
            INSERT INTO Roles (name, description) VALUES
            ('Admin', 'Administrator with full access'),
            ('Building Owner', 'Owner of the building'),
            ('Tenant', 'Resident of the apartment')
            ON CONFLICT (name) DO NOTHING;
        `);

        console.log('Roles seeded successfully!');
    } catch (err) {
        console.error('Error seeding roles:', err);
    } finally {
        pool.end();
    }
};

seedRoles();
