import prisma from "../config/prisma.config";
import ApiResponse from "../helper/ApiResponse";
import asyncHandler from "../helper/asyncHandler";
import { Request, Response } from "express";


// List - List the stores. store id, store manager, address and number of times movies
// has been rented from the store and the staff count. On clicking the number of times
// rented, it should open a right panel and should show the all the rentals with
// pagination. On clicking the staff count, it should open a right panel and should show
// all the staffs with pagination.

// • Sort – I should be able to sort the stores alphabetically, staff count, rental count.
// • Filter - I should be able to filter a store by city, zip code, staff count (greater than, less
// than, equal to). Multiple filter conditions should work in AND mode.

// • Store details – On Clicking the store id, a right panel should open which should have
// 3 tabs. The 
// -store details (manager, address etc). The
// -list of staff in the store.
// -rentals from that store.

type StoreSort = {
    id?: 'asc' | 'desc';
    staff_count?: 'asc' | 'desc';
    rental_count?: 'asc' | 'desc';
};
export const getStores = asyncHandler(async (req: Request, res: Response) => {
    const { sort, city, zipcode }: { sort: StoreSort, city?: string, zipcode?: string } = req.body;
    const stores = await prisma.store.findMany({
        where: {
            AND: [
                city ? {
                    address: {
                        city: {
                            city: city
                        }
                    }
                } : {},

                zipcode ? {
                    address: {
                        postal_code: zipcode
                    }
                } : {}
            ],
        },
        select: {
            store_id: true,
            staff_store_manager_staff_idTostaff: {
                select: {
                    staff_id: true,
                    first_name: true,
                    last_name: true,
                }
            },
            _count: true,
            address: {
                include: {
                    city: true
                }
            }
        },
        orderBy: [
            sort?.id ? { store_id: sort.id } : {},
            sort?.rental_count ? {
                inventory: {
                    _count: sort.rental_count
                }
            } : {},
            sort?.staff_count ? {
                staff_staff_store_idTostore: {
                    _count: sort.rental_count
                }
            } : {}
        ]
    });

    return res.send(stores);
});

export const getStoreDetails = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const store = await prisma.store.findFirst({
        where: { store_id: Number(id) },
        select: {
            store_id: true,
            staff_store_manager_staff_idTostaff: {
                select: {
                    staff_id: true,
                    first_name: true,
                    last_name: true,
                }
            },
            staff_staff_store_idTostore: {
                select: {
                    staff_id: true,
                    first_name: true,
                    last_name: true,
                }
            },
            inventory: {
                take:5
            },
            address: {
                include: {
                    city: true
                }
            }
        },
    })

    const rentals = await prisma.rental.findMany({
        where: {
            inventory: {
                store: {
                    store_id: Number(id)
                }
            }
        },
        take:10
    });


    return res.send(new ApiResponse("data", 200, { store, rentals }))
});