package db

import "github.com/Fishdigger/web-app-dev-course/HenryBooks/server/entities"

//Seed ... initializes database with some data and creates tables
func Seed() {
	Conn.AutoMigrate(&entities.Book{})
	Conn.AutoMigrate(&entities.Branch{})
	Conn.AutoMigrate(&entities.Inventory{})

	var books = make([]entities.Book, 3)
	books[0] = entities.Book{
		Author:       "Joel Gregory",
		Title:        "Joel Hates .NET",
		Description:  "It could just anti-Microsoft propoganda, but he really does hate .NET.",
		ThumbnailUrl: "https://bangunnagoro.files.wordpress.com/2016/04/gopher.jpg?w=440&h=440",
		Price:        12.48,
	}
	books[1] = entities.Book{
		Author:       "Myungjae Kwak",
		Title:        ".NET Core is Better, I Promise",
		Description:  "Dr. Kwak tries his damnedest to convice people .NET ain't so bad.",
		ThumbnailUrl: "https://atomrace.com/blog/wp-content/uploads/2016/03/windows-ans-nsa.png",
		Price:        5.99,
	}
	books[2] = entities.Book{
		Author:       "Alan Stines",
		Title:        "How to Stop Hating PHP",
		Description:  "Alan attempts to use PHP to teach basic programming; he turns into a null reference pointer.",
		ThumbnailUrl: "http://devhumor.com/content/uploads/images/December2016/php-best-practices.jpg",
		Price:        5.77,
	}

	var branches = make([]entities.Branch, 2)
	branches[0] = entities.Branch{
		Name:          "School of Hard Knocks",
		StreetAddress: "123 Hell Street",
		City:          "Los Angeles",
		State:         "MN",
		ZipCode:       "87654",
		PhoneNumber:   "5553214569",
	}
	branches[1] = entities.Branch{
		Name:          "Henry's Books",
		StreetAddress: "96 Hwy 96",
		City:          "Warner Robins",
		State:         "GA",
		ZipCode:       "31088",
		PhoneNumber:   "4786769296",
	}

	var inventories = make([]entities.Inventory, 4)
	inventories[0] = entities.Inventory{
		BookID:   1,
		BranchID: 1,
		Quantity: 31,
	}
	inventories[1] = entities.Inventory{
		BookID:   2,
		BranchID: 1,
		Quantity: 55,
	}
	inventories[2] = entities.Inventory{
		BookID:   3,
		BranchID: 2,
		Quantity: 883,
	}
	inventories[3] = entities.Inventory{
		BookID:   1,
		BranchID: 2,
		Quantity: 2,
	}

	for _, book := range books {
		if Conn.NewRecord(book) {
			Conn.Create(&book)
		}
	}
	for _, branch := range branches {
		if Conn.NewRecord(branch) {
			Conn.Create(&branch)
		}
	}
	for _, inv := range inventories {
		if Conn.NewRecord(inv) {
			Conn.Create(&inv)
		}
	}
}
