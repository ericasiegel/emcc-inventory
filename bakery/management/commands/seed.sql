insert into
  bakery_cookie (id, name)
values
  (1, 'Celebration'),
  (2, 'SMores'),
  (3, 'Chefs Dream'),
  (4, 'Red Velvet'),
  (5, 'Snickerdoodle');

insert into
  bakery_recipe (
    id,
    description,
    ingredients,
    instructions,
    created_at,
    last_updated,
    cookie_id,
    modified_by_id
  )
values
  (1, 'Classic sugar cookie with sprinkles', '2 1/4 cups all-purpose flour, 1/2 teaspoon baking soda, 1 cup unsalted butter, softened, 1/2 cup granulated sugar, 1 cup packed brown sugar, 1 teaspoon vanilla extract, 2 large eggs, 2 cups semisweet chocolate chips', '1. Preheat the oven to 375°F (190°C). 2. In a small bowl, combine the flour and baking soda. Set aside. 3. In a large bowl, cream together the butter, granulated sugar, and brown sugar until smooth. 4. Beat in the vanilla extract and eggs until well blended. 5. Gradually add the flour mixture to the butter mixture and mix well. 6. Stir in the chocolate chips. 7. Drop rounded tablespoons of dough onto ungreased baking sheets. 8. Bake for 9 to 11 minutes or until golden brown. 9. Allow cookies to cool on baking sheets for 2 minutes before transferring to wire racks to cool completely.', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 1, 1),
  (2, 'New spin on SMores in cookie form', '1 cup unsalted butter, softened, 1 cup packed brown sugar, 1/2 cup granulated sugar, 2 large eggs, 1 teaspoon vanilla extract, 1 1/2 cups all-purpose flour, 1 teaspoon baking soda, 1 teaspoon ground cinnamon, 1/2 teaspoon salt, 3 cups old-fashioned oats, 1 cup raisins', '1. Preheat the oven to 350°F (175°C). 2. In a large bowl, cream together the butter, brown sugar, and granulated sugar until smooth. 3. Beat in the eggs one at a time, then stir in the vanilla extract. 4. In a separate bowl, combine the flour, baking soda, cinnamon, and salt. Gradually add this mixture to the butter mixture and mix well. 5. Stir in the oats and raisins. 6. Drop rounded tablespoons of dough onto ungreased baking sheets. 7. Bake for 10 to 12 minutes or until golden brown. 8. Allow cookies to cool on baking sheets for 2 minutes before transferring to wire racks to cool completely.', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 2, 1),
  (3, 'Browned butter cookie with butterscotch chips', '1/2 cup unsalted butter, softened, 3/4 cup creamy peanut butter, 1/3 cup granulated sugar, 1/3 cup packed brown sugar, 1 large egg, 2 tablespoons milk, 1 teaspoon vanilla extract, 1 1/2 cups all-purpose flour, 1 teaspoon baking soda', '1. Preheat the oven to 375°F (190°C). 2. In a large bowl, cream together the butter, peanut butter, granulated sugar, and brown sugar until smooth. 3. Beat in the egg, milk, and vanilla extract until well combined. 4. In a separate bowl, combine the flour and baking soda. Gradually add this mixture to the butter mixture and mix well. 5. Shape the dough into 1-inch balls and roll in granulated sugar. 6. Place the balls on ungreased baking sheets and bake for 8 to 10 minutes', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 3, 1),
  (4, 'red velvet cookie with chocolate ganache filling', '1 cup unsalted butter, softened, 1 cup packed brown sugar, 1/2 cup granulated sugar, 2 large eggs, 1 teaspoon vanilla extract, 1 1/2 cups all-purpose flour, 1 teaspoon baking soda, 1 teaspoon ground cinnamon, 1/2 teaspoon salt, 3 cups old-fashioned oats, 1 cup raisins', '1. Preheat the oven to 350°F (175°C). 2. In a large bowl, cream together the butter, brown sugar, and granulated sugar until smooth. 3. Beat in the eggs one at a time, then stir in the vanilla extract. 4. In a separate bowl, combine the flour, baking soda, cinnamon, and salt. Gradually add this mixture to the butter mixture and mix well. 5. Stir in the oats and raisins. 6. Drop rounded tablespoons of dough onto ungreased baking sheets. 7. Bake for 10 to 12 minutes or until golden brown. 8. Allow cookies to cool on baking sheets for 2 minutes before transferring to wire racks to cool completely.', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 4, 1),
  (5, 'Epic large snickerdoodle goodness', '1/2 cup unsalted butter, softened, 3/4 cup creamy peanut butter, 1/3 cup granulated sugar, 1/3 cup packed brown sugar, 1 large egg, 2 tablespoons milk, 1 teaspoon vanilla extract, 1 1/2 cups all-purpose flour, 1 teaspoon baking soda', '1. Preheat the oven to 375°F (190°C). 2. In a large bowl, cream together the butter, peanut butter, granulated sugar, and brown sugar until smooth. 3. Beat in the egg, milk, and vanilla extract until well combined. 4. In a separate bowl, combine the flour and baking soda. Gradually add this mixture to the butter mixture and mix well. 5. Shape the dough into 1-inch balls and roll in granulated sugar. 6. Place the balls on ungreased baking sheets and bake for 8 to 10 minutes', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 5, 1);

insert into
  bakery_storage (id, title)
values
  (1, 'Kitchen Fridge'),
  (2, 'Storage Fridge'),
  (3, 'Right Storage'),
  (4, 'Kitchen Freezer'),
  (5, 'Pantry');

insert into
  bakery_shelf (id, type, storage_id)
values
  (1, 'top', 1),
  (2, 'middle', 1),
  (3, 'bottom', 1),
  (4, 'top', 5),
  (5, 'bottom', 5);

INSERT INTO bakery_dough (
  id,
  quantity,
  date_added,
  cookie_id,
  shelf_id
)
VALUES
  (1, 5, CURRENT_TIMESTAMP, 2, 3),
  (2, 3, CURRENT_TIMESTAMP, 1, 5),
  (3, 8, CURRENT_TIMESTAMP, 3, 2),
  (4, 2, CURRENT_TIMESTAMP, 4, 1),
  (5, 6, CURRENT_TIMESTAMP, 5, 4),
  (6, 1, CURRENT_TIMESTAMP, 3, 5),
  (7, 4, CURRENT_TIMESTAMP, 1, 2),
  (8, 9, CURRENT_TIMESTAMP, 5, 3),
  (9, 7, CURRENT_TIMESTAMP, 4, 5),
  (10, 10, CURRENT_TIMESTAMP, 2, 4);


insert into
  bakery_bakedcookie (
    id,
    size,
    quantity,
    date_added,
    cookie_id,
    shelf_id
  )
values
  (1, 'mini', 5, CURRENT_TIMESTAMP, 2, 3),
  (2, 'mega', 3, CURRENT_TIMESTAMP, 1, 5),
  (3, 'mini', 8, CURRENT_TIMESTAMP, 3, 2),
  (4, 'mega', 2, CURRENT_TIMESTAMP, 4, 1),
  (5, 'mini', 6, CURRENT_TIMESTAMP, 5, 4),
  (6, 'mega', 1, CURRENT_TIMESTAMP, 3, 5),
  (7, 'mini', 4, CURRENT_TIMESTAMP, 1, 2),
  (8, 'mega', 9, CURRENT_TIMESTAMP, 5, 3),
  (9, 'mini', 7, CURRENT_TIMESTAMP, 4, 5),
  (10, 'mega', 10, CURRENT_TIMESTAMP, 2, 4);


insert into
  bakery_grocery (
    id,
    title,
    quantity,
    description,
    shelf_id,
    order_link
  )
values
  (1, 'Flour', 5, 'High-quality all-purpose flour for baking', 1, 'https://example.com/flour'),
  (2, 'Sugar', 3, 'Granulated sugar for sweetening', 1, 'https://example.com/sugar'),
  (3, 'Eggs', 12, 'Farm-fresh eggs for baking', 1, 'https://example.com/eggs'),
  (4, 'Butter', 2, 'Unsalted butter for rich flavor', 1, 'https://example.com/butter'),
  (5, 'Vanilla Extract', 1, 'Pure vanilla extract for aromatic flavor', 1, 'https://example.com/vanilla'),
  (6, 'Baking Powder', 4, 'Leavening agent for baked goods', 1, 'https://example.com/baking-powder'),
  (7, 'Chocolate Chips', 8, 'Semisweet chocolate chips for cookies', 1, 'https://example.com/chocolate-chips'),
  (8, 'Oats', 6, 'Old-fashioned oats for oatmeal cookies', 1, 'https://example.com/oats'),
  (9, 'Raisins', 3, 'Dried raisins for oatmeal raisin cookies', 1, 'https://example.com/raisins'),
  (10, 'Peanut Butter', 2, 'Creamy peanut butter for peanut butter cookies', 1, 'https://example.com/peanut-butter');

insert into
  bakery_store (
    id,
    size,
    quantity,
    last_updated,
    cookie_id,
    updated_by_id
  )
values
  (1, 'mini', 5, CURRENT_TIMESTAMP, 2, 1),
  (2, 'mega', 3, CURRENT_TIMESTAMP, 1, 1),
  (3, 'mini', 8, CURRENT_TIMESTAMP, 3, 1),
  (4, 'mega', 2, CURRENT_TIMESTAMP, 4, 1),
  (5, 'mega', 6, CURRENT_TIMESTAMP, 5, 1),
  (6, 'mega', 1, CURRENT_TIMESTAMP, 3, 1),
  (7, 'mini', 4, CURRENT_TIMESTAMP, 1, 1),
  (8, 'mini', 9, CURRENT_TIMESTAMP, 5, 1);