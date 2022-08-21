import Skeleton from "react-loading-skeleton";

// Styles + Icons
import "react-loading-skeleton/dist/skeleton.css";
import { container, zigzag, borderSpacer } from "@styles/components/Cards.module.css";

export default function BookingLoading() {
	return (
		<div className={`cursor-pointer ${container}`}>
			<div className={`d-flex flex-column bg-white ${zigzag}`}>
				<div className="d-flex flex-column p-4 gap-2">
					<div style={{ height: 21 }}>
						<Skeleton className="h-100" duration={0.5} />
					</div>
					<div style={{ height: 30 }}>
						<Skeleton className="h-100" duration={0.5} />
					</div>
					<div style={{ height: 21 }}>
						<Skeleton className="h-100" duration={0.5} />
					</div>
				</div>
				<div className={`p-4 pb-5 ${borderSpacer}`}>
					<div style={{ height: "37px" }}>
						<Skeleton className="h-100" duration={0.5} />
					</div>
				</div>
			</div>
		</div>
	);
}
