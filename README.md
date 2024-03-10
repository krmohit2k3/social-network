Source Code:

Models:
		User model
		Post model
		Follow model
Routes:
		Authentication routes (signup, login)
		User profile routes (view, update, delete)
		Post routes (create, view, update, delete)
		Follow routes (follow, unfollow)
Controllers:
		Authentication controller
		User profile controller
		Post controller
		Follow controller
MongoDB Schema Designs:

User schema:
		username
		email
		password (hashed)
		profile picture URL
		bio
Post schema:
		text content
		timestamp
		user ID (a reference to the user who created it)
Follow schema:
		follower ID (a reference to the user who follows)
		followed ID (a reference to the user who is followed)

Integration Tests:
		Test authentication routes (signup, login)
		Test user profile routes (view, update, delete)
		Test post routes (create, view, update, delete)
		Test follow routes (follow, unfollow)
ROUTES :
				app.use('/api/auth', authRoutes);                        
				app.use('/api/users', userRoutes);
				app.use('/api/posts', postRoutes);
				app.use('/api/follows', followRoutes);

APIs:
 http://localhost:5000/api/auth/signup  ------------------------------>  For signup 
 http://localhost:5000/api/auth/login   ------------------------------>  For login
 http://localhost:5000/api/posts     --------------------------------->  For creating a new post and Reading the post
 http://localhost:5000/api/posts/:postId  ---------------------------->  For updating and deleting the post
 http://localhost:5000/api/follows/:userId --------------------------->  For following a user and unfollowing
 http://localhost:5000/api/users/:userId  ---------------------------->  For update, delete, and get user profile


README File:
Setup instructions:
Install dependencies (npm install)
Configure environment variables (e.g., MongoDB connection string, JWT secret, PORT)
Start the application (npm start || node server.js --check all APis using POSTMAN	)
