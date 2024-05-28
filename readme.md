// Admin user:

    "email": "omryIke@gmail.com"
    "password": "Omry123!"

// Database string:

    mongodb+srv://adirpoliti:RsveLODUOQ52kHo2@vacations.al16hwc.mongodb.net/

// Docker Hub images:
    BE Image:
        Link:
            https://hub.docker.com/repository/docker/adirpoliti/fullstack_vacation_backend/general
        Pull:
            docker pull adirpoliti/fullstack_vacation_backend

    FE Image:
        Link:
            https://hub.docker.com/repository/docker/adirpoliti/fullstack_vacation_frontend/general
        Pull:
            docker pull adirpoliti/fullstack_vacation_frontend

// Password Regex:

    must use capital letter, small letter, number, special characters, at least 8 characters

// Email Regex: 

    must contain something@something.something - required @ and . 

// BE Routes to use:

        Vacations:
            Get:
                All - http://localhost:3001/api/vacations
                One - http://localhost:3001/api/vacations/one/:id
                Active - http://localhost:3001/api/vacations/active
                Inactive - http://localhost:3001/api/vacations/inactive
                Followed - http://localhost:3001/api/vacations/followed
            Delete:
                Remove - http://localhost:3001/api/vacations/remove/:id
            Post:
                New - http://localhost:3001/api/vacations/new
                Follow - http://localhost:3001/api/vacations/follow/:id
            Patch:
                Edit - http://localhost:3001/api/vacations/edit
        Users:
            Post:
                Signup - http://localhost:3001/api/auth/register
                Login - http://localhost:3001/api/auth/login
        CSV:
            Post:
                Create - http://localhost:3001/api/csv
        Version:
            Get:
                Show - http://localhost:3001/v