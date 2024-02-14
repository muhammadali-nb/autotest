import { useQuery } from "@tanstack/react-query";
import catalogService from "../../../api-functions/catalog-page/catalog-service";
import { MetaTags } from "../../layout/BaseLayout";
import MetaDecorator from "../../layout/MetaDecorator";
import CatalogLayout from "../../layout/CatalogLayout";
import { Col, Container, Row } from "react-bootstrap";
import CatalogMobileMenu from "../Catalog/CatalogMobileMenu";
import CatalogFiltersBlock from "../Catalog/CatalogFilterBlock";
import { AlertMessage } from "../CatalogPage";
import FilterButtons from "../Catalog/FilterButtons";
import CarGrid from "../Catalog/CarGrid";
import { SmallFooter } from "../../layout/Footer";
import { Link } from "react-router-dom";
import { useState } from "react";
import CarCard from "./CatalogCarCard/CarCard";

const CatalogPage = () => {
	const [isOpen, setOpen] = useState<boolean>(false);
	const title = "Рассрочка - " + process.env.REACT_APP_WEBSITE_NAME;

	const meta: MetaTags = {
		description: "Выкуп,Каталог автомобилей",
		keywords: "выкуп,каталог,лизинг,авто,список,leasing",
	};

	const { data, isLoading, error } = useQuery({
		queryKey: ["catalog-filter"],
		queryFn: () => catalogService.getFilter(),
	});

	return (
		<>
			<MetaDecorator title={title} url="/catalog" />
			<CatalogLayout
				meta={meta}
				title={title}
				headerSelectedLink={"/catalog"}
				footerSmall>
				<div className="catalog">
					<Container fluid={"xxl"}>
						<CatalogMobileMenu
							data={data}
							isActive={isOpen}
							setIsActive={setOpen}
						/>
						<div>
							<Row>
								<Col lg={3}>
									{/* <div className={"sticky-no-scrollbar"}> */}
									<CatalogFiltersBlock filterData={!isLoading && data} />
									{/* </div> */}
								</Col>
								<Col lg={9} className="d-flex flex-column">
									<AlertMessage
										page={"catalog"}
										type={"danger"}
										className={"catalog-alert"}
										local_message={
											<p className="catalog-alert_message">
												Здесь представлены автомобили, которые проходят по
												программам лизинга.
												<br></br>
												Если Вам необходим автомобиль в аренду перейдите в
												раздел <Link to={"/rent/page/1"}>Аренда.</Link>
											</p>
										}
									/>
									{!error && (
										<FilterButtons
											mode="book"
											isShowMobileFiler={setOpen}
											catalogData={!isLoading && data.top}
										/>
									)}
									{/* <CarGrid /> */}
                  {/* <CarCard/> */}
									<SmallFooter className="mt-auto" />
								</Col>
							</Row>
						</div>
					</Container>
				</div>
			</CatalogLayout>
		</>
	);
};

export default CatalogPage;
