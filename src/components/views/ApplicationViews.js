import { Outlet, Route, Routes } from "react-router-dom"
import { HenList } from "../hens/HenList"
import { HenDetails } from "../hens/HenDetails"
import { HenForm } from "../hens/HenForm"

export const ApplicationViews = () => {
	return (
		<Routes>
			<Route path="/" element={
				<>
					<h1>Pecker Palace</h1>
					<div>The only chicken tracker you'll ever need</div>

					<Outlet />
				</>
			}>
				<Route path="hens" element={<HenList />} />
				<Route path="hens/:henId" element={< HenDetails />} />

				<Route path="hen/create" element={<HenForm />} />

			</Route>
		</Routes>
	)
}

